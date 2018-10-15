import { Component, OnInit, ViewChild } from '@angular/core';
import { APIService } from '../../services/apiservice.service';
import { APIConstants } from '../../services/constants';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { UtilService } from '../../services/utils.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { trigger, transition, animate, style } from '@angular/animations';
import { Ovf } from '../../model/v1830.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'v1830-ovf',
	templateUrl: './ovf.component.html',
	styleUrls: ['./ovf.component.css'],
	animations: [
		trigger('slideInOut', [
			transition(':enter', [
				style({ transform: 'translateY(-100%)' }),
				animate('300ms ease-in-out', style({ transform: 'translateY(0%)' }))
			]),
			transition(':leave', [
				animate('300ms ease-in-out', style({ transform: 'translateY(-100%)' }))
			])
		])
	]
})
export class OvfComponent implements OnInit {
	pagetitle = 'Manage OVFs';
	refreshbtn: boolean = true;
	addbtn: boolean = true;
	searchbtn: boolean = true;
	ovfform: FormGroup;
	submitbuttonaction: string;
	clearbuttonaction: string;
	showform = false;
	ovfs$: Observable<Array<Ovf>>;
	currentovf: Ovf;
	hidevalidationerror: boolean = true;
	errormessage: string = '';
	products: any[] = [
		{ value: 'WDM', viewValue: 'WDM' },
		{ value: 'OCS', viewValue: 'OCS' }
	];
	@ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
	columns: { columnDef: string; header: string; width: string; dispcolumn: boolean; cell: (element: any) => string; }[] = [
		{ columnDef: 'name', header: 'Name', width: '1%', dispcolumn: false, cell: (element: any) => `${element.name}` },
		{ columnDef: 'product', header: 'Product', width: '1%', dispcolumn: false, cell: (element: any) => `${element.product}` },
		{ columnDef: 'version', header: 'Version', width: '1%', dispcolumn: false, cell: (element: any) => `${element.version}` }
	];
	constructor(private dialogs: DialogsService, private service: APIService, private utilsservice: UtilService) {
		this.submitbuttonaction = 'Add';
		this.clearbuttonaction = 'Clear';
		this.createForm();
	}

	ngOnInit() {
		this.ovfs$ = this.service.getAPI(APIConstants.OVF_URL);
	}

	createForm() {
		this.ovfform = new FormGroup({
			name: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z][a-zA-Z0-9._-]+$)|[a-zA-Z]')]),
			url: new FormControl('', Validators.required),
			product: new FormControl('', Validators.required),
			version: new FormControl('')
		});
	}

	refreshClick() {
		this.ovfs$ = this.service.getAPI(APIConstants.OVF_URL);
	}

	onAddClick() {
		this.showform = true;
		this.submitbuttonaction = 'Add';
		this.clearbuttonaction = 'Clear';
		this.errormessage = '';
		this.ovfform.controls['name'].enable();
		this.clearFormGroupDirective('Clear');
	}

	closeFormGroupDirective() {
		this.formGroupDirective.resetForm();
		this.hidevalidationerror = true;
		this.showform = false;
	}

	clearFormGroupDirective(clearorreset) {
		this.hidevalidationerror = true;
		if (clearorreset == 'Clear') {
			this.formGroupDirective.resetForm();
		} else {
			this.setFormValues();
		}
	}

	onEditClick(row) {
		this.currentovf = Object.assign({}, row);
		console.log('edit row value:::', row);
		this.submitbuttonaction = 'Update';
		this.clearbuttonaction = 'Reset';
		this.showform = true;
		this.ovfform.controls['name'].disable();
		this.setFormValues();
		console.log('onedit ', this.ovfform.getRawValue());
	}

	setFormValues() {
		this.ovfform.setValue({
			'name': this.currentovf.name, 'url': this.currentovf.url, 'product': this.currentovf.product, 'version': this.currentovf.version
		});
	}

	onDelete(row) {
		console.log('delete is clicked');
		this.dialogs.confirm('Delete OVF', 'Are you sure you want to delete ' + row.name + ' ?', 'Delete').subscribe((res) => {
			console.log('result from confirm:::', res);
			if (res) {
				console.log('delete name:::', row.name);
				this.service.deleteAPI(APIConstants.OVF_URL, row.name)
					.subscribe((logmsg) => {
						console.log('delete logmsg:::', logmsg);
						if (logmsg.affectedRows === 1) {
							console.log('deleted row');
							this.refreshClick();
						}
						if (this.submitbuttonaction == 'Update') {
							this.closeFormGroupDirective();
						}
					}, (err) => {
						console.log('not delted');
						this.utilsservice.log2('server failure in deleting vcenter(err.status)', err.status);
					});
			}
		});
	}

	doAction() {
		console.log(this.ovfform.value);
		if (this.ovfform.invalid) {
			this.hidevalidationerror = false;
			this.errormessage = 'Please fill out valid data!';
		} else {
			console.log('else part');
			const url = this.ovfform.get('url').value;
			const urlsplit = url.split('/');
			const splittedurl = urlsplit[urlsplit.length - 2];
			const product = splittedurl.split('-');
			const versionno = product.splice(2).join('.');
			this.ovfform.patchValue({version: versionno});
			if (this.submitbuttonaction == 'Add') {
				console.log('add daataa', this.ovfform.value);
				this.service.postAPI(APIConstants.OVF_URL, this.ovfform.value)
				.subscribe((addresult) => {
					if (addresult.code == 'ER_DUP_ENTRY') {
						if (addresult.sqlMessage.indexOf('PRIMARY') != -1) {
							this.hidevalidationerror = false;
							this.errormessage = 'OVF Name is already available, Name must unique for each entry.';
						}
					} else {
						this.clearFormGroupDirective('Clear');
						this.refreshClick();
					}
				}, (err) => {
					if (err.status == '400') {
						this.hidevalidationerror = false;
						if (err._body.indexOf('ER_DUP_ENTRY') != -1) {
							this.hidevalidationerror = false;
							if (err._body.indexOf('url_unique') != -1) {
								this.errormessage = 'URL already exists.';
							} else {
								this.errormessage = 'OVF Name is already available, Name must unique for each entry.';
							}
						} else {
							this.errormessage = 'Failed, Please try again';
						}
					}
				});
			} else if (this.submitbuttonaction == 'Update') {
				this.service.editAPI(APIConstants.OVF_EDIT, '', this.ovfform.getRawValue())
				.subscribe((editresult) => {
					this.closeFormGroupDirective();
					this.refreshClick();
				});
			}
		}
	}

}
