import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Vcenter, Ovf, SelectOpion } from '../../model/v1830.model';
import { Observable } from 'rxjs';
import { APIConstants } from '../../services/constants';
import { APIService } from '../../services/apiservice.service';
import { Router } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { MatStepper } from '@angular/material';

@Component({
    selector: 'v1830-addresource',
    templateUrl: './addresource.component.html',
    styleUrls: ['./addresource.component.css']
})
export class AddresourceComponent implements OnInit {
    isLinear = true;
    resourceform: FormGroup;
    pagetitle: string = 'Add Resource Configuration';
    vcenters$: Observable<Array<Vcenter>>;
    ovfs$: Observable<Array<Ovf>>;
    datacenters$: Observable<Array<String>>;
    folders$: Observable<Array<String>>;
    clusters$: Observable<Array<String>>;
    datastores$: Observable<Array<String>>;
    networks$: Observable<Array<String>>;
    message: string = '';
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
    constructor(private _formBuilder: FormBuilder, private service: APIService, private router: Router) { }

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
            webserverdirectory: new FormControl('')
        });
    }

    onChanges(): void {
        this.resourceform.valueChanges.subscribe(val => {
            console.log(this.resourceform.valid);
            if (this.resourceform.valid) {
                this.message = '';
            }
            console.log('this.message ---- ', this.message);
        });
        this.resourceform.valueChanges.subscribe(val => {
            console.log('inside form changes');
            console.log('resourceform', this.resourceform.valid);
            this.resourceform.valid ? this.isLinear = false : this.isLinear = true;
            console.log(this.isLinear);
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
        const addrc = {
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
            nete3: '',
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
        console.log('submit dara ', addrc);
        this.service.postAPI(APIConstants.RESOURCE_URL, addrc)
            .subscribe((result) => {
                console.log(result);
            }, (err) => {
                // this.utilsservice.log(err.status);
                // this.utilsservice.authenticationFailed(err.status);
            });
    }
}

