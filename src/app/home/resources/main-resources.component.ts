import { Component, OnInit, Inject } from '@angular/core';
import { DialogsService } from '../dialogs/dialogs.service';
import { APIConstants } from '../../services/constants';
import { UtilService } from '../../services/utils.service';
import { APIService } from '../../services/apiservice.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { startWith, map } from 'rxjs/operators';
import { MatStepper } from '@angular/material';
import { Vcenter, Ovf, SelectOpion } from '../../model/v1830.model';
import { Observable } from 'rxjs';
export interface MainResources {
        name: string;
    ovftemplate: string;
        vcenter: string;
}
export interface DialogData {
	title: string;
	logdata: string;
}
@Component({
        selector: 'v1830-main-resources',
        templateUrl: './main-resources.component.html',
        styleUrls: ['./main-resources.component.css']
})
export class MainResourcesComponent implements OnInit {

        pagetitle = 'Manage Resources';
        refreshbtn: boolean = true;
        addbtn: boolean = true;
        searchbtn: boolean = true;
        show: boolean;
        hide = true;
        buttonname: string;
        result: boolean;
        addclick = true;

        columns: { columnDef: string; header: string; width: string; dispcolumn: boolean; cell: (element: any) => string; }[] = [
                { columnDef: 'name', header: 'Name', width: '1%', dispcolumn: false, cell: (element: any) => `${element.name}` },
                { columnDef: 'ovfdefault', header: 'OVF Template', width: '1%', dispcolumn: false, cell: (element: any) => `${element.ovfdefault}` },
                { columnDef: 'vcenter', header: 'vCenter', width: '1%', dispcolumn: false, cell: (element: any) => `${element.vcenter}` }

        ];
        elements: any;


        constructor(private dialogs: DialogsService, private service: APIService, private utilsservice: UtilService, private router: Router, public dialog: MatDialog) {
                console.log('table component initialized');
                console.log('constants::', APIConstants.RESOURCE_URL);
                this.buttonname = 'Add';
                this.show = true;
                this.getResource();
        }

        ngOnInit() {
                console.log('onint');
        }

        getResource() {
                this.service.getAPI(APIConstants.RESOURCE_URL)
        .subscribe((resources) => {
                console.log('result::::',resources);
                this.elements = resources;
        }, (err) => {
                // this.utilsservice.log2('server failure in retriving ovfs(err.status)', err.status);
                // this.utilsservice.authenticationFailed(err.status);
        });
}

        applyFilter(filterValue: string) {
                console.log('filter value:::', filterValue);
                this.elements.filter = filterValue.trim().toLowerCase();
        }
        onAddClick1() {
                this.router.navigate(['/home/resources/addresource']);
        }
        onAddClick() {
				//  this.router.navigate(['/home/resources/addresource']);
				const dialogRef = this.dialog.open(AddEditResourcesComponent, {data: { title: 'Add resource', logdata: ''}});
				  dialogRef.afterClosed().subscribe(result => {
					console.log('The dialog was closed');

				  });
        }

        refreshClick() {
                console.log('refreshclick is called');
                this.getResource();
        }

        onDelete(row) {
                console.log('delete is clicked');
                this.dialogs.confirm('Delete Resource', 'Are you sure you want to delete ' + row.name + ' ?', 'Delete').subscribe((resource) => {
                        console.log('result from confirm:::', resource);
                        if (resource) {
                                console.log('delete name:::', row.name);
                                this.service.deleteAPI(APIConstants.RESOURCE_URL, row.name)
                                        .subscribe((logmsg) => {
                                                console.log('delete logmsg:::', logmsg);
                                                if (logmsg.affectedRows == 1) {
                                                        console.log('deleted row');
                                                        this.refreshClick();
                                                }
                                        }, (err) => {
                                                console.log('not delted');
                                                this.utilsservice.log2('server failure in deleting resource(err.status)', err.status);
                                        });
                        }
                });
        }
}

@Component({
	selector: 'v1830-addeditresource',
    templateUrl: 'addeditresource.component.html',
    styleUrls: ['./addresource.component.css']
  })
  export class AddEditResourcesComponent implements OnInit {
    ovfproduct: any;
    showreviewwdm: boolean;
    showreview: boolean;
    shownete3: boolean;
    showilan: boolean;
        isLinear = true;
    resourceform: FormGroup;
    pagetitle = 'Add Resource Configuration';
    vcenters$: Observable<Array<Vcenter>>;
    ovfs$: Observable<Array<Ovf>>;
    datacenters$: Observable<Array<String>>;
    folders$: Observable<Array<String>>;
    clusters$: Observable<Array<String>>;
    datastores$: Observable<Array<String>>;
    networks$: Observable<Array<String>>;
    message = '';
    showport = false;
    ovfchange: string;
    options: string[] = ['PSS32', 'PSS4', 'PSI2T'];
    filteredOptions: Observable<string[]>;
    shelfmode: SelectOpion[] = [
        { value: 'SONET', viewValue: 'SONET' },
        { value: 'SDH', viewValue: 'SDH' }
    ];
    bootlevel: SelectOpion[] = [
        { value: 'clear', viewValue: 'Clear' },
        { value: 'load', viewValue: 'Load' },
        { value: 'install', viewValue: 'Install' },
        { value: 'drivers', viewValue: 'Drivers' },
        { value: 'ready', viewValue: 'Ready' }
    ];
    runlevel: SelectOpion[] = [
        { value: 'stop', viewValue: 'Stop' },
        { value: 'start', viewValue: 'Start' },
        { value: 'commission', viewValue: 'Commission' }
    ];
    ramunit: SelectOpion[] = [
        { value: 'gb', viewValue: 'GB' },
        { value: 'mb', viewValue: 'MB' }
    ];
    diskmodeopt: SelectOpion[] = [
        { value: 'nomode', viewValue: 'Datastore Default' },
        { value: 'thin', viewValue: 'Thin Provision' },
        { value: 'thick', viewValue: 'Thick Provision Lazy Zeroed' },
        { value: 'eagerZeroedThick', viewValue: 'Thick Provision Eager Zeroed' }
    ];
    constructor(private _formBuilder: FormBuilder, private service: APIService, private router: Router, public dialogRef: MatDialogRef<AddEditResourcesComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private obj: MainResourcesComponent) { }

    ngOnInit() {
        this.constructRCForm();
        this.vcenters$ = this.service.getAPI(APIConstants.RETRIEVE_VCENTER);
        this.ovfs$ = this.service.getAPI(APIConstants.OVF_URL);
        this.filteredOptions = this.resourceform.get('mastershelftype').valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
        this.onChanges();
    }

    constructRCForm() {
        this.resourceform = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z][a-zA-Z0-9._-]+$)|[a-zA-Z]')]),
            mqttserver: new FormControl('', Validators.required),
            vcenter: new FormControl('', Validators.required),
            ovf: new FormControl('', Validators.required),
            datacenter: new FormControl('', Validators.required),
            folder: new FormControl(''),
            hostcluster: new FormControl('', Validators.required),
            datastore: new FormControl('', Validators.required),
            network: new FormControl('', Validators.required),
            networkgmre: new FormControl('', Validators.required),
            mastershelftype: new FormControl('PSS32'),
            shelfmode: new FormControl('SONET'),
            localinstall: new FormControl(''),
            neload: new FormControl('https://virtual1830.es-si-s3-z2.eecloud.nsn-net.net/loads/NE/'),
            gmreload: new FormControl('https://virtual1830.es-si-s3-z2.eecloud.nsn-net.net/loads/GMRE/'),
            oarload: new FormControl('https://virtual1830.es-si-s3-z2.eecloud.nsn-net.net/loads/OAR/'),
            bootlevel: new FormControl('ready'),
            runlevel: new FormControl('commission'),
            netoamp: new FormControl(''),
            nete1: new FormControl(''),
            nete2: new FormControl(''),
            nete3: new FormControl(''),
            netvoip: new FormControl(''),
            netilan: new FormControl(''),
            netcit: new FormControl(''),
            netauxa: new FormControl(''),
            netauxs: new FormControl(''),
            diskmode: new FormControl('nomode'),
            ramsize: new FormControl('2'),
            ramunit: new FormControl('gb'),
            numberofcores: new FormControl('1'),
            webserverurl: new FormControl(''),
            webserverdirectory: new FormControl('/var/www/html')
        });
    }

    onChanges(): void {
        this.ovfchange = this.resourceform.get('ovf').value;
        console.log('ovf product' , this.ovfchange);
        this.resourceform.valueChanges.subscribe(val => {
           if (this.resourceform.valid) {
               this.message = '';
           }
        });
        this.resourceform.get('datacenter').disable();
        this.resourceform.get('folder').disable();
        this.resourceform.get('hostcluster').disable();
        this.resourceform.get('network').disable();
        this.resourceform.get('networkgmre').disable();
        this.resourceform.get('datastore').disable();
        this.resourceform.get('ovf').valueChanges.subscribe(val => {
            console.log(val);
        });
        this.resourceform.get('vcenter').valueChanges.subscribe(val => {
            if (val.name != '') {
                this.resourceform.get('datacenter').enable();
                this.datacenters$ = this.service.postAPI(APIConstants.RETRIEVE_DATACENTER, val);
            }
        });
        this.resourceform.get('datacenter').valueChanges.subscribe(val => {
            console.log('on datacenter change');
            if (val != '') {
                this.resourceform.get('hostcluster').enable();
                this.resourceform.get('folder').enable();
                const temp = this.resourceform.get('vcenter').value;
                temp['datacenter'] = val;
                this.clusters$ = this.service.postAPI(APIConstants.RETRIEVE_HOSTCLUSTER, temp);
                this.folders$ = this.service.postAPI(APIConstants.RETRIEVE_FOLDER, temp);
            }
        });
        this.resourceform.get('hostcluster').valueChanges.subscribe(val => {
            console.log('on hostcluster change');
            if (val != '') {
                this.resourceform.get('datastore').enable();
                this.resourceform.get('network').enable();
                this.resourceform.get('networkgmre').enable();
                const temp = this.resourceform.get('vcenter').value;
                temp['datacenter'] = this.resourceform.get('datacenter').value;
                temp['cluster'] = val;
                this.datastores$ = this.service.postAPI(APIConstants.RETRIEVE_DATASTORE, temp);
                this.networks$ = this.service.postAPI(APIConstants.RETRIEVE_NETWORK, temp);
            }
        });
        this.resourceform.get('network').valueChanges.subscribe(val => {
            console.log(val);
            if (val != '') {
                console.log('inside if of network');
                this.resourceform.patchValue({
                    'netoamp': val,
                    'nete1': val,
                    'nete2': val,
                    'nete3': val,
                    'netilan': val,
                    'netauxa': val,
                    'netauxs': val,
                    'netvoip': val,
                    'netcit': val
                });
            }
        });
        this.resourceform.get('mqttserver').valueChanges.subscribe(val => {
            console.log(val);
            if (val != '') {
                console.log('inside if of network');
                this.resourceform.patchValue({
                    'webserverurl': 'http://' + val
                });
            }
        });
    }

    private _filter(value: string): string[] {
        // console.log('inside filter');
        if (value) {
            const filterValue = value.toLowerCase();
            return this.options.filter(option => option.toLowerCase().includes(filterValue));
        }
    }
    close(): void {
        this.dialogRef.close();
      }
    checkFormValid(stepper: MatStepper) {
        if (!this.resourceform.valid) {
            this.message = 'Please fill out all the fields!';
        } else {
            this.message = '';
            stepper.next();
        }
        // stepper.next();
    }
    onAddClick() {
        this.router.navigate(['/home/resources/']);
    }

    addResourceConfig() {
        let addrc;
        if (this.ovfproduct == 'WDM') {
             addrc = {
                name: this.resourceform.get('name').value,
                vcenter: this.resourceform.get('vcenter').value.name,
                mqttserver: this.resourceform.get('mqttserver').value,
                diskmode: this.resourceform.get('diskmode').value,
                localinstall: '',
                datacenter: this.resourceform.get('datacenter').value,
                vcenteruser: this.resourceform.get('vcenter').value.username + ':' + this.resourceform.get('vcenter').value.password,
                datastore: this.resourceform.get('datastore').value,
                cluster: this.resourceform.get('hostcluster').value,
                network: this.resourceform.get('network').value,
                netgmre: this.resourceform.get('networkgmre').value,
                netoamp: this.resourceform.get('netoamp').value,
                nete1: this.resourceform.get('nete1').value,
                nete2: this.resourceform.get('nete2').value,
                ovfdefault: this.resourceform.get('ovf').value.name,
                netvoip: this.resourceform.get('netvoip').value,
                netilan: this.resourceform.get('netilan').value,
                netcit: this.resourceform.get('netcit').value,
                netauxa: this.resourceform.get('netauxa').value,
                netauxb: this.resourceform.get('netauxs').value,
                nocores: this.resourceform.get('numberofcores').value,
                ramsize: this.resourceform.get('ramsize').value,
                ramunit: this.resourceform.get('ramunit').value,
                mainshelf: this.resourceform.get('mastershelftype').value,
                shelfmode: this.resourceform.get('shelfmode').value,
                neurl: this.resourceform.get('neload').value,
                gmreurl: this.resourceform.get('gmreload').value,
                oarurl: this.resourceform.get('oarload').value,
                bootlevel: this.resourceform.get('bootlevel').value,
                runlevel: this.resourceform.get('runlevel').value,
                folder: this.resourceform.get('folder').value,
                webserverdir: this.resourceform.get('webserverdirectory').value,
                webserverurl: this.resourceform.get('webserverurl').value
            };
        } else {
            addrc = {
                name: this.resourceform.get('name').value,
                vcenter: this.resourceform.get('vcenter').value.name,
                mqttserver: this.resourceform.get('mqttserver').value,
                diskmode: this.resourceform.get('diskmode').value,
                localinstall: '',
                datacenter: this.resourceform.get('datacenter').value,
                vcenteruser: this.resourceform.get('vcenter').value.username + ':' + this.resourceform.get('vcenter').value.password,
                datastore: this.resourceform.get('datastore').value,
                cluster: this.resourceform.get('hostcluster').value,
                network: this.resourceform.get('network').value,
                netgmre: this.resourceform.get('networkgmre').value,
                nete3: this.resourceform.get('nete3').value,
                ovfdefault: this.resourceform.get('ovf').value.name,
                netilan: this.resourceform.get('netilan').value,
                nocores: this.resourceform.get('numberofcores').value,
                ramsize: this.resourceform.get('ramsize').value,
                ramunit: this.resourceform.get('ramunit').value,
                mainshelf: this.resourceform.get('mastershelftype').value,
                shelfmode: this.resourceform.get('shelfmode').value,
                neurl: this.resourceform.get('neload').value,
                gmreurl: this.resourceform.get('gmreload').value,
                oarurl: this.resourceform.get('oarload').value,
                bootlevel: this.resourceform.get('bootlevel').value,
                runlevel: this.resourceform.get('runlevel').value,
                folder: this.resourceform.get('folder').value,
                webserverdir: this.resourceform.get('webserverdirectory').value,
                webserverurl: this.resourceform.get('webserverurl').value
            };
        }
        console.log('submit dara ', addrc);
        this.service.postAPI(APIConstants.RESOURCE_URL, addrc)
            .subscribe((result) => {
                console.log(result);
            }, (err) => {
                // this.utilsservice.log(err.status);
                // this.utilsservice.authenticationFailed(err.status);
            });
    }
    test(ovf) {
        console.log('change ', ovf.value.product);
        this.ovfproduct = ovf.value.product;
        if (ovf.value.product == 'WDM') {
        this.showport = true;
        this.showilan = true;
        this.shownete3 = false;
        this.showreviewwdm = true;
        this.showreview = false;
        } else {
            this.showport = false;
            this.showilan = true;
            this.shownete3 = true;
            this.showreviewwdm = false;
            this.showreview = true;
        }
     }
}



