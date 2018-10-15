import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { DialogsService } from '../dialogs/dialogs.service';
import { APIService } from '../../services/apiservice.service';
import { UtilService } from '../../services/utils.service';
import { APIConstants } from '../../services/constants';
import { ManageUsers } from '../../model/v1830.model';
import { Observable, timer } from 'rxjs';


@Component({
  selector: 'v1830-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css']
})
export class ManageusersComponent implements OnInit {
  elements: any;
  pagetitle = 'Manage Users';
	refreshbtn: boolean = true;
	addbtn: boolean = true;
	searchbtn: boolean = true;
  hidepassword = true;
  manageusersform : FormGroup;
  errormessage: string = '';
  manageusers$: Observable<Array<ManageUsers>>;
	submitbuttonaction: string;
	clearbuttonaction: string;
	showform = false;
  manageuserform: FormGroup;
  
	columns: { columnDef: string; header: string; dispcolumn: boolean; cell: (element: any) => string; }[] = [
		{ columnDef: 'username', header: 'UserName', dispcolumn: false, cell: (element: any) => `${element.username}` },
    { columnDef: 'role', header: 'Role', dispcolumn: false, cell: (element: any) => `${element.role}` },
    { columnDef: 'groupname', header: 'Group name', dispcolumn: false, cell: (element: any) => `${element.groupname}` }
   
    
  ];
  
  constructor(private dialogs: DialogsService, private service: APIService, private utilsservice: UtilService) { 
    this.createForm();
  }


  ngOnInit() {
    this.manageusers$ = this.service.getAPI(APIConstants.RETRIEVE_MANAGE_USERS);
  }
  

  private createForm() {
		this.manageusersform = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmpassword: new FormControl('', Validators.required),
      usergroup: new FormControl('', Validators.required),
      userrole: new FormControl('', Validators.required)
			
		});
	}
  refreshClick() {
		this.manageusers$ = this.service.getAPI(APIConstants.RETRIEVE_MANAGE_USERS);
  }
  
  onAddClick() {
		this.showform = true;
	}
  
  applyFilter(filterValue: string) {
		console.log('filter value:::', filterValue);
		this.elements.filter = filterValue.trim().toLowerCase();
  }

  closeFormGroupDirective() {
		// this.formGroupDirective.resetForm();
		// this.hidevalidationerror = true;
		this.showform = false;
	}
  
  onDelete(row) {
		console.log('delete is clicked');
		this.dialogs.confirm('Delete user details', 'Are you sure you want to delete ' + row.name + ' ?', 'Delete').subscribe((manage) => {
			console.log('result from confirm:::', manage);
			if (manage) {
				console.log('delete name:::', row.name);
				this.service.deleteAPI(APIConstants.RETRIEVE_MANAGE_USERS, row.name)
					.subscribe((logmsg) => {
						console.log('delete logmsg:::', logmsg);
						if (logmsg.affectedRows == 1) {
							console.log('deleted row');
							this.refreshClick();
						}
					}, (err) => {
						console.log('not delted');
						this.utilsservice.log2('server failure in deleting user details(err.status)', err.status);
					});
			}
		});
	}

}
