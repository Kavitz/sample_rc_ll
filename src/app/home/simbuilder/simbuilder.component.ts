import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { APIService } from '../../services/apiservice.service';
import { APIConstants } from '../../services/constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { DialogsService } from '../dialogs/dialogs.service';
import { UtilService } from '../../services/utils.service';
// tslint:disable-next-line:import-destructuring-spacing
import { FileValidator } from '../simbuilder/input.file.validator';
@Component({
  selector: 'v1830-simbuilder',
  templateUrl: './simbuilder.component.html',
  styleUrls: ['./simbuilder.component.css'],
	animations: [
		trigger('slideInOut', [
		  transition(':enter', [
			style({transform: 'translateY(-100%)'}),
			animate('300ms ease-in-out', style({transform: 'translateY(0%)'}))
		  ]),
		  transition(':leave', [
			animate('300ms ease-in-out', style({transform: 'translateY(-100%)'}))
		  ])
		])
	  ]
})
export class SimbuilderComponent implements OnInit {
  pagetitle = 'Simlist Configuration';
	refreshbtn = true;
  addbtn = true;
  simbuilderlist ;
  simbuilderform: FormGroup;
  searchbtn = true;
  resourceconfiguration: string [] = [] ;
  addclick = true;
  buttonname ;
  filename ;
  show: boolean;
  choosenfile = true;
  elements: any;
  simlisterror = false ;
  private currentsimlist: any = {
    filename: '', vm_group: '', loadname: '', gmre_load_name: '', gmre_ip_address: '', resourceconfig: '',
    install: '', provision: '', forceinstall: '', port_number: '', no_of_parallel_install: '', delay_btw_install: '', oar_load_name: ''
};
  columns: { columnDef: string; header: string; dispcolumn: boolean; cell: (element: any) => string; }[] = [
		{ columnDef: 'filename', header: 'File Name', dispcolumn: false,  cell: (element: any) => `${element.filename}` },
		{ columnDef: 'ne_load',     header: 'NE Load',  dispcolumn: false, cell: (element: any) => `${element.ne_load}`     },
    { columnDef: 'gmre_load',   header: 'GMRE Load', dispcolumn: true, cell: (element: any) => `${element.gmre_load}`   },
    { columnDef: 'oar_load',   header: 'OAR Load', dispcolumn: true, cell: (element: any) => `${element.oar_load}`   },
    { columnDef: 'fiber_ip_address',   header: 'Fiber_IP_Address', dispcolumn: true, cell: (element: any) => `${element.fiber_ip_address}`   },
    { columnDef: 'resourceconfig',   header: 'ResourceConfig', dispcolumn: true, cell: (element: any) => `${element.resourceconfig}`   },
    { columnDef: 'install',   header: 'Install', dispcolumn: true, cell: (element: any) => `${element.install}`   },
    { columnDef: 'provision',   header: 'Provision', dispcolumn: true, cell: (element: any) => `${element.provision}`   },
    { columnDef: 'forceinstall',   header: 'ForceInstall', dispcolumn: true, cell: (element: any) => `${element.forceinstall}`   },
    { columnDef: 'user_id',   header: 'User Name', dispcolumn: false, cell: (element: any) => `${element.user_id}`   },
    { columnDef: 'no_parallel_install',   header: 'No_Parallel_Install', dispcolumn: true, cell: (element: any) => `${element.no_parallel_install}`   },
    { columnDef: 'vm_group',   header: 'VM_Group', dispcolumn: true, cell: (element: any) => `${element.vm_group}`   },
    { columnDef: 'delay_bet_install',   header: 'Delay_Bet_Install', dispcolumn: true, cell: (element: any) => `${element.delay_bet_install}`   }
   ];

  constructor(private service: APIService,  private cd: ChangeDetectorRef, private dialogs: DialogsService, private utilsservice: UtilService) {
    this.buttonname = 'Add';
		this.show = true;
    this.service.getAPI(APIConstants.RETRIEVE_RESOURCE)
	.subscribe((resourceconfiguration) => {
		this.resourceconfiguration = resourceconfiguration;
		console.log('datasource:::', this.resourceconfiguration);

	}, (err) => {
		// this.utilsservice.log2('server failure in retriving vcenter(err.status)', err.status);
		// this.utilsservice.authenticationFailed(err.status);
	});
    this.createForm() ;
   this.getsimList();
  }
  onAddClick() {
		this.addclick = false;
	}
  ngOnInit() {
  }

	applyFilter(filterValue: string) {
		console.log('filter value:::', filterValue);
		this.elements.filter = filterValue.trim().toLowerCase();
	}
  private createForm() {
		this.simbuilderform = new FormGroup({
			filename: new FormControl('', Validators.required),
			resourceconfig: new FormControl('', Validators.required),
			ne_load: new FormControl('', Validators.required),
      gmre_load: new FormControl('', Validators.required),
      oar_load: new FormControl('', Validators.required),
      fiber_ip_address: new FormControl('', Validators.required),
      fiber_port: new FormControl('0', Validators.required),
      install: new FormControl(true, Validators.required),
      provision: new FormControl(true, Validators.required),
      forceinstall: new FormControl(true, Validators.required),
      no_parallel_install: new FormControl('1', Validators.required),
      vm_group: new FormControl('', Validators.required),
      delay_bet_install: new FormControl('0', Validators.required)
		});
  }
  getsimList() {
    this.service.getAPI(APIConstants.RETRIEVE_SIMLIST)
    .subscribe((simlist) => {
      this.elements = simlist;
      console.log('datasource:::', this.simbuilderlist);

    }, (err) => {
      // this.utilsservice.log2('server failure in retriving vcenter(err.status)', err.status);
      // this.utilsservice.authenticationFailed(err.status);
    });
  }
  clearForm(str) {
    this.buttonname = 'Add';
    this.choosenfile = true;
		this.simbuilderform.controls['filename'].enable();
		if (str) {
			this.addclick = true;
		}
	}
  onEdit(row) {
    this.addclick = false;
    this.choosenfile = false;
		console.log('edit row value:::', row.resourceconfig);
		console.log('edit is called', row.name);
    this.show = false;
    this.simbuilderform.controls['filename'].disable();
    this.simbuilderform.controls['filename'].setValue(row.filename);
		this.simbuilderform.controls['resourceconfig'].setValue(row.resourceconfig);
    this.simbuilderform.controls['ne_load'].setValue(row.ne_load);
    this.simbuilderform.controls['gmre_load'].setValue(row.gmre_load);
    this.simbuilderform.controls['oar_load'].setValue(row.oar_load);
    this.simbuilderform.controls['fiber_ip_address'].setValue(row.fiber_ip_address);
    this.simbuilderform.controls['fiber_port'].setValue(row.fiber_port);
    this.simbuilderform.controls['install'].setValue(row.install);
    this.simbuilderform.controls['provision'].setValue(row.provision);
    this.simbuilderform.controls['forceinstall'].setValue(row.forceinstall);
    this.simbuilderform.controls['no_parallel_install'].setValue(row.no_parallel_install);
    this.simbuilderform.controls['vm_group'].setValue(row.vm_group);
    this.simbuilderform.controls['delay_bet_install'].setValue(row.delay_bet_install);
		if (!this.show) {
			this.buttonname = 'Update';
		} else if (this.show) {
			this.buttonname = 'Add';
		}
		this.show = true;
  }
  refreshClick() {
		console.log('refreshclick is called');
		this.getsimList();
  }
  onDelete(row) {
		console.log('delete is clicked', row);
		this.dialogs.confirm('Delete vCenter', 'Are you sure you want to delete ' + row.filename + ' ?', 'Delete').subscribe((res) => {
			console.log('result from confirm:::', res);
			if (res) {
				console.log('delete name:::', row.filename);
        // DELETE_SIMLIST
       /** this.service.deleteAPI(APIConstants.DELETE_SIMLIST, row.filename)
					.subscribe((logmsg) => {
						console.log('delete logmsg:::', logmsg);
						if (logmsg.affectedRows === 1) {
							console.log('deleted row');
							this.refreshClick();
						}
					}, (err) => {
						console.log('not delted');
						this.utilsservice.log2('server failure in deleting vcenter(err.status)', err.status);
					});**/

			}
		});
  }
  editSimbuilderFields() {
    console.log('form values::', this.simbuilderform.getRawValue());
    console.log('file nam,e:::', this.simbuilderform.get('filename').value);
    this.currentsimlist = this.simbuilderform.getRawValue();
    console.log('current simbuilder value:::', this.currentsimlist);
    console.log('current simbuilder file value:::', this.currentsimlist.filename);
    if (this.currentsimlist.install == '0') {
      this.currentsimlist.install = false;
  } else {
      this.currentsimlist.install = true;
  }
  if (this.currentsimlist.forceinstall == '0') {
      this.currentsimlist.forceinstall = false;
  } else {
      this.currentsimlist.forceinstall = true;
  }
  if (this.currentsimlist.provision == '0') {
      this.currentsimlist.provision = false;
  } else {
      this.currentsimlist.provision = true;
  }
    this.service.editAPI(APIConstants.EDIT_SIMLIST, this.currentsimlist.filename,  this.currentsimlist).subscribe((logmsg) => {
      if (logmsg.affectedRows === 'updated') {
				console.log('logmsg1:::edit:::', logmsg);
				this.refreshClick();
				this.simbuilderform.controls['filename'].enable();
			}
    });
  }
  onFileChange(val) {
    this.simlisterror = false ;
    const file = val.target.files[0];
    console.log('chossen file', val.target.files[0]);
    console.log('chossen file name', this.simbuilderform.get('filename').value);
    const reader = new FileReader();
 if (val.target.files[0].type != 'text/xml') {
   this.simlisterror = true ;
   console.log('selected valid file');
    }
    if ( val.target.files && val.target.files.length) {
      const [fileval] = val.target.files;
      console.log('swe value', fileval);
      reader.readAsDataURL(fileval);
      reader.onload = () => {
        this.simbuilderform.patchValue({
          file: reader.result
        });
console.log('file valie:::', reader.result ) ;
      };
    }
  }
  addSimbuilderFields() {
    this.choosenfile = true;
    if (this.simbuilderform.valid) {
      if (this.buttonname === 'Update') {
        this.choosenfile = false;
        this.editSimbuilderFields();
			} else if (this.buttonname === 'Add') {
      //  console.log('add values::',this.s)
    }
  }
}
}
