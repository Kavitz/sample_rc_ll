import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatExpansionPanel } from '@angular/material';
import { APIService } from '../../services/apiservice.service';
import { APIConstants } from '../../services/constants';
import { SelectOpion } from '../../model/v1830.model';
import { DialogsService } from '../dialogs/dialogs.service';
import { SpinnerService } from '../spinner/spinner.service';

export class Vcenter {
	name: string;
	ipaddress: string;
	username: string;
	password: string;
}

// tslint:disable-next-line:max-classes-per-file
export class Ovfs {
	name: string;
	product: string;
	version: string;
	url: string;
}
export class ResourceConfig {
	name: string;
	mqttserver: string;
	diskmode: string;
	localinstall: boolean;
	vcenter: Vcenter;
	ovftemplate: Ovfs;
	datastore: string;
	datacenter: string;
	cluster: string;
	network: string;
	netgmre: string;
	netoamp: string;
	nete1: string;
	nete2: string;
	nete3: string;
	netvoip: string;
	netilan: string;
	netcit: string;
	netauxa: string;
	netauxb: string;
	nocores: number;
	ramsize: number;
	ramunit: string;
	mainshelf: string;
	shelfmode: string;
	neurl: string;
	gmreurl: string;
	oarurl: string;
	bootlevel: string;
	runlevel: string;
	folder: string;
	webserverdir: string;
	webserverurl: string;
}
@Component({
	selector: 'v1830-simpevm',
	templateUrl: './simpevm.component.html',
	styleUrls: ['./simpevm.component.css']
})
export class SimpevmComponent implements OnInit {
	userName: any;
	tempresourceConfiguration: any = {};
	propertytitle: string;
	todos = [{ name: 'slsb07', age: '1' }, { name: 'slsd07', age: '2' }, { name: 'slsd10', age: '2' }, { name: 'testrc', age: '2' }, { name: 'testrc1', age: '2' }, { name: 'testrc2', age: '2' }, { name: 'testrc3', age: '2' }, { name: 'testrc4', age: '2' }, { name: 'testrc5', age: '2' }, { name: 'testrc5', age: '2' }, { name: 'testrc6', age: '2' }];
	list: string[];
	pagetitle = 'Simple VM Deployment';
	refreshbtn = false;
	// tslint:disable-next-line:variable-name
	user_name;
	private simrunlevel = 'commission';
	addbtn = false;
	private editshelfModeArray: SelectOpion[];
	title;
	loadurltitle;
	panelOpenState = false;
	searchbtn = false;
	private datastoreslist: any = [];
	toggleiconlabel = 'chevron_left';
	private shelfArray: any;
	private ovftemplateslist: any = [];
	private vcenterslist: any = [];
	private datacenterslist: any = [];
	action;
	result;
	private currentrc: ResourceConfig = { name: '', mqttserver: '', vcenter: { name: '', ipaddress: '', username: '', password: '' }, ovftemplate: { name: '', product: '', version: '', url: '' }, datastore: '', datacenter: '', cluster: '', network: '', netgmre: '', netoamp: '', nete1: '', nete2: '', nete3: '', netvoip: '', netilan: '', netcit: '', netauxa: '', netauxb: '', diskmode: 'nomode', nocores: 1, ramsize: 2, mainshelf: 'PSS32', shelfmode: 'SONET', localinstall: false, neurl: 'https://virtual1830.es-si-s3-z2.eecloud.nsn-net.net/loads/NE/', gmreurl: 'https://virtual1830.es-si-s3-z2.eecloud.nsn-net.net/loads/GMRE/', oarurl: 'https://virtual1830.es-si-s3-z2.eecloud.nsn-net.net/loads/OAR/', bootlevel: 'ready', runlevel: 'commission', folder: '', ramunit: 'gb', webserverurl: '', webserverdir: '' };
	private folderslist: string[] = [];
	wdmModeArray: SelectOpion[] = [
		{ value: 'SONET', viewValue: 'Sonet' },
		{ value: 'SDH', viewValue: 'SDH' }
	];
	ocsModeArray: SelectOpion[] = [
		{ value: 'ETSI', viewValue: 'ETSI' },
		{ value: 'ANSI', viewValue: 'ANSI' }
	];
	message;
	matrixsize;
	private ocsshelfArray: any;
	private wdmshelfArray: any;
	tempvcenter;
	tempovf;
	private enablevalgrind = false;

	private Clusterlist: any = [];
	private Networklist: any = [];
	private resourceconfig: string = '';
	shelfmode: SelectOpion[];
	wdmshelfmode: SelectOpion[] = [
		{ value: 'SONET', viewValue: 'Sonet' },
		{ value: 'SDH', viewValue: 'SDH' }
	];
	ocsshelfmode = [
		{ value: 'ETSI', viewValue: 'ETSI' },
		{ value: 'ANSI', viewValue: 'ANSI' }
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
		{ value: 'nomode', viewValue: 'Datastore default' },
		{ value: 'thin', viewValue: 'Thin Provision' },
		{ value: 'thick', viewValue: 'Thick Provision Lazy Zeroed' },
		{ value: 'eagerZeroedThick', viewValue: 'Thick Provision Eager Zeroed' }];

	displayhide = true;
	simplevmForm: FormGroup;
	stateCtrl = new FormControl();
	resourceconfiguration: string[] = [];
	simplevm: any;
	options: string[] = ['PSS32', 'PSS4', 'PSI2T'];
	filteredOptions: Observable<string[]>;
	private isShowProgress: boolean = false;
	constructor(private service: APIService, private dialogs: DialogsService, private spinner: SpinnerService) {
		const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
		this.user_name = currentUser.username;
		if (currentUser) {
			this.userName = currentUser.username;
		}
		this.service.getAPI(APIConstants.RETRIEVE_RESOURCE)
			.subscribe((resourceconfiguration) => {
				this.resourceconfiguration = resourceconfiguration;
				console.log('datasource:::', this.resourceconfiguration);

			}, (err) => {
				// this.utilsservice.log2('server failure in retriving vcenter(err.status)', err.status);
				// this.utilsservice.authenticationFailed(err.status);
			});
		this.shelfmode = this.wdmshelfmode;
		this.service.getAPI(APIConstants.RETRIEVE_SHELFTYPES)
			.subscribe((shelves) => {
				this.shelfArray = shelves;
			});
		this.service.getAPI(APIConstants.RETRIEVE_VCENTER)
			.subscribe((vcenters) => {
				this.vcenterslist = vcenters;
			});
		this.service.getAPI(APIConstants.OVF_URL)
			.subscribe((ovftemplates) => {
				this.ovftemplateslist = ovftemplates;
			});
		this.service.getAPI(APIConstants.RETRIEVE_SHELFTYPESOCS)
			.subscribe((ocsArray) => {
				this.ocsshelfArray = ocsArray;
			});
		this.service.getAPI(APIConstants.RETRIEVE_SHELFTYPES)
			.subscribe((shelves) => {
				this.wdmshelfArray = shelves;
			});
	}

	ngOnInit() {
		this.simplevmForm = new FormGroup({
			vmname: new FormControl('', Validators.required),
			ipaddress: new FormControl('', Validators.required),
			neloadurl: new FormControl('', Validators.required),
			nebuild: new FormControl('', Validators.required),
			nodetid: new FormControl(''),
			mastershelftype: new FormControl(''),
			shelfmode: new FormControl(''),
			loopbackip: new FormControl(''),
			valgrind: new FormControl(''),
			localinstall: new FormControl(''),
			bootlevel: new FormControl(''),
			runlevel: new FormControl(''),
			configuregmre: new FormControl(''),
			gmreloadurl: new FormControl(''),
			gmrebuild: new FormControl(''),
			gmrenodeip: new FormControl(''),
			gmrenotifyip: new FormControl(''),
			activategmre: new FormControl(''),
			configureoar: new FormControl(''),
			oarloadurl: new FormControl(''),
			oarbuild: new FormControl(''),
			activateoar: new FormControl(''),
			vmdiskmode: new FormControl(''),
			noofcores: new FormControl(''),
			ramsize: new FormControl(''),
			ramunit: new FormControl('')
		});
		this.filteredOptions = this.simplevmForm.get('mastershelftype').valueChanges
			.pipe(
				startWith(''),
				map(value => this._filter(value))
			);
	}


	togglePanel() {
		this.panelOpenState = !this.panelOpenState;
	}

	private _filter(value: string): string[] {
		if (value) {
			const filterValue = value.toLowerCase();
			return this.options.filter(option => option.toLowerCase().includes(filterValue));
		}
	}
	changeIconLabel() {
		this.toggleiconlabel = this.toggleiconlabel == 'chevron_left' ? 'chevron_right' : 'chevron_left';
	}
	getVMProperties(resourceconfig: string) {
		console.log(' inside getVMProperties');
		console.log('selected value', resourceconfig.replace('.cfg', ''));
		this.displayhide = false;
		this.resourceconfig = resourceconfig;
		//  this.currentelement = resourceconfig.replace('.cfg', '');
		this.service.selectAPI(APIConstants.RETRIEVE_RCPROPERTIES, resourceconfig.replace('.cfg', '')).subscribe((properties) => {
			const rcProperties = properties[0];
			console.log('properties:::', rcProperties);
			this.simplevmForm.controls['neloadurl'].setValue(rcProperties.neurl);
			this.simplevmForm.controls['mastershelftype'].setValue(rcProperties.mainshelf);

			this.simplevmForm.controls['shelfmode'].setValue(rcProperties.shelfmode);
			this.simplevmForm.controls['bootlevel'].setValue(rcProperties.bootlevel);
			this.simplevmForm.controls['runlevel'].setValue(rcProperties.runlevel);
			this.simplevmForm.controls['gmreloadurl'].setValue(rcProperties.gmreurl);
			this.simplevmForm.controls['oarloadurl'].setValue(rcProperties.oarurl);
			this.simplevmForm.controls['nodetid'].setValue('n1');
			// /this.simplevmForm.controls['shelfmode'].setValue(rcProperties.shelfmode);
			if (rcProperties.localinstall != undefined && rcProperties.localinstall == 'True') {
				this.simplevmForm.controls['localinstall'].setValue(true);
			} else {
				this.simplevmForm.controls['localinstall'].setValue(false);
			}
			if (rcProperties.diskmode != undefined) {
				this.simplevmForm.controls['vmdiskmode'].setValue(rcProperties.diskmode);
			} else {
				this.simplevmForm.controls['vmdiskmode'].setValue('nomode');
			}
			this.simplevmForm.controls['noofcores'].setValue(rcProperties.nocores);
			this.simplevmForm.controls['ramsize'].setValue(rcProperties.ramsize);
			this.simplevmForm.controls['ramunit'].setValue(rcProperties.ramunit);
			for (const i in this.vcenterslist) {
				if (this.vcenterslist[i].name == rcProperties.vcenter) {
					this.tempvcenter = this.vcenterslist[i];
					break;
				}
			}
			for (const i in this.ovftemplateslist) {
				if (this.ovftemplateslist[i].name == rcProperties.ovfdefault) {
					this.tempovf = this.ovftemplateslist[i];
					break;
				}
			}
			if (this.tempovf == '' || this.tempovf == undefined) {
				this.tempovf = rcProperties.ovfdefault;
				this.ovftemplateslist.push({ name: this.tempovf });
			}
			this.service.addAPI(APIConstants.RETRIEVE_DATACENTER, this.tempvcenter)
				.subscribe((datacenters) => {
					this.datacenterslist = datacenters.filter(Boolean);
					console.log('datacenterslist:::', this.datacenterslist);
				});
			console.log('shelf mode:::', this.tempovf.product);
			if (this.tempovf.product == 'OCS') {
				this.title = 'Region Mode';
				this.editshelfModeArray = this.ocsModeArray;
				this.propertytitle = 'ZIC';
				this.loadurltitle = 'Configure ZIC Properties';
				this.options = this.ocsshelfArray;
				console.log('option ocs value:::', this.options);
			}
			if (this.tempovf.product == 'WDM') {
				this.title = 'Shelf Mode';
				this.editshelfModeArray = this.wdmModeArray;
				this.loadurltitle = 'Configure OAR Properties';
				this.propertytitle = 'OAR';
				this.options = this.wdmshelfArray;
				console.log('option wdm value:::', this.options);
			}
			this.service.addAPI(APIConstants.RETRIEVE_FOLDER, { name: this.tempvcenter.name, ipaddress: this.tempvcenter.ipaddress, username: this.tempvcenter.username, password: this.tempvcenter.password, datacenter: rcProperties.datacenter })
				.subscribe((folders) => {
					this.folderslist = folders;
					console.log('folderslist:::', this.folderslist);
					if (this.folderslist.indexOf(rcProperties.folder) == -1) {
						this.folderslist.push(rcProperties.folder);
					}
				});
			this.service.addAPI(APIConstants.RETRIEVE_HOSTCLUSTER, { name: this.tempvcenter.name, ipaddress: this.tempvcenter.ipaddress, username: this.tempvcenter.username, password: this.tempvcenter.password, datacenter: rcProperties.datacenter })
				.subscribe((clusters) => {
					this.Clusterlist = clusters;
					console.log('Clusterlist:::', this.Clusterlist);
					if (this.Clusterlist.indexOf(rcProperties.cluster) == -1) {
						this.Clusterlist.push(rcProperties.cluster);
					}
				});
			this.service.addAPI(APIConstants.RETRIEVE_NETWORK, { name: this.tempvcenter.name, ipaddress: this.tempvcenter.ipaddress, username: this.tempvcenter.username, password: this.tempvcenter.password, datacenter: rcProperties.datacenter, cluster: rcProperties.cluster })
				.subscribe((networks) => {
					this.Networklist = networks;
					console.log('Networklist:::', this.Networklist);
				});
			this.service.addAPI(APIConstants.RETRIEVE_DATASTORE, { name: this.tempvcenter.name, ipaddress: this.tempvcenter.ipaddress, username: this.tempvcenter.username, password: this.tempvcenter.password, datacenter: rcProperties.datacenter, cluster: rcProperties.cluster })
				.subscribe((datastores) => {
					this.datastoreslist = datastores;
					console.log('datastoreslist:::', this.datastoreslist);
				});
			this.currentrc = { 'name': rcProperties.name, 'mqttserver': rcProperties.mqttserver, 'diskmode': rcProperties.diskmode, 'ovftemplate': this.tempovf, 'vcenter': this.tempvcenter, 'datacenter': rcProperties.datacenter, 'datastore': rcProperties.datastore, 'cluster': rcProperties.cluster, 'network': rcProperties.network, 'netgmre': rcProperties.netgmre, 'netoamp': rcProperties.netoamp, 'nete1': rcProperties.nete1, 'nete2': rcProperties.nete2, 'nete3': rcProperties.nete3, 'netvoip': rcProperties.netvoip, 'netilan': rcProperties.netilan, 'netcit': rcProperties.netcit, 'netauxa': rcProperties.netauxa, 'netauxb': rcProperties.netauxb, 'folder': rcProperties.folder, 'nocores': rcProperties.nocores, 'ramsize': rcProperties.ramsize, 'mainshelf': rcProperties.mainshelf, 'shelfmode': rcProperties.shelfmode, 'neurl': rcProperties.neurl, 'gmreurl': rcProperties.gmreurl, 'oarurl': rcProperties.oarurl, 'bootlevel': rcProperties.bootlevel, 'runlevel': rcProperties.runlevel, 'localinstall': false, 'ramunit': rcProperties.ramunit, 'webserverurl': rcProperties.webserverurl, 'webserverdir': rcProperties.webserverdir };
			if (rcProperties.localinstall == 'True') {
				rcProperties.localinstall = true;
			}
		});
		// this.tempresourceConfiguration = Object.assign({}, this.currentrc);
	}
	deployvm() {
		this.spinner.confirm(true).subscribe((res) => {
			console.log('mat spiner');
		});

		console.log(' inside deployvm');
		this.isShowProgress = true;
		//  this.spinnerService.show();
		console.log('deployVM functi');
		console.log('check box selected::', this.simplevmForm.get('valgrind').value);
		console.log('vmname sara:::', this.resourceconfig.replace('.cfg', ''));
		this.service.selectAPI(APIConstants.CHECKIPTEMP, this.simplevmForm.get('vmname').value + '/' + this.simplevmForm.get('ipaddress').value + '/' + this.resourceconfig.replace('.cfg', '')).subscribe((status) => {
			this.spinner.confirm(false).subscribe((res) => {
				console.log('mat spiner');
			});
			this.message = '';
			console.log('status msg:::', status);
			this.isShowProgress = false;
			if (status === 'IP Address used for some other device') {
				this.message = 'IP Address is already in use for another device.';
				this.dialogs.deployConfirm('Alert', this.message, 'OK', 'deploy').subscribe((res) => {
					console.log('result from confirm:::', res);
					if (!res) {
						return;
					}
				});
			} else if (status === 'OK') {
				this.proceedeployvmFile();
			} else if (status === 'overwrite confirmation both') {
				this.message = 'VM is already exist. Do you want overwrite?' +
					'Click OK to confirm.';
				this.dialogs.deployConfirm('Alert', this.message, 'OK', 'deploy').subscribe((res) => {
					console.log('result from confirm:::', res);
					if (!res) {
						return;
					}
				});
			} else if (status.indexOf('overwrite confirmation name') !== -1) {
				this.message = 'This Name is already assigned to another VM.' +
					'Do you want overwrite?Click Ok to confirm.';
				this.action = status.split(' ')[3];
				this.dialogs.deployConfirm('Alert', this.message, 'OK', 'deploy').subscribe((res) => {
					console.log('result from confirm:::', res);
					if (!res) {
						return;
					}
				});

			} else if (status.indexOf('overwrite confirmation ipaddress') !== -1) {
				this.message = 'IP Address is already in use for another VM.' +
					' Please correct it and try again.';
				this.dialogs.deployConfirm('Alert', this.message, 'OK', 'deploy').subscribe((res) => {
					console.log('result from confirm:::', res);
					if (!res) {
						return;
					}
				});
			} else if (status.indexOf('both used in different') != -1) {
				this.message = 'Both IP Address and VM Name are used for different VMs.' +
					' Please correct it and try again.';
				this.dialogs.deployConfirm('Alert', this.message, 'OK', 'deploy').subscribe((res) => {
					console.log('result from confirm:::', res);
					if (!res) {
						return;
					}
				});
			}
			console.log('continue::::');
		}
			, (err) => {
				console.log(err, 'err');
				console.log(err.status);
			});
	}
	proceedeployvmFile() {
		console.log('inise proceedeployvmFile');
		if (this.resourceconfig.replace('.cfg', '') == this.tempresourceConfiguration.name) {
			this.tempresourceConfiguration.name = this.tempresourceConfiguration.name + '_Duplicate';
			const addrcfile = { 'name': this.tempresourceConfiguration.name, 'vcenter': this.tempresourceConfiguration.vcenter.ipaddress, 'datacenter': this.tempresourceConfiguration.datacenter, 'vcenteruser': this.tempresourceConfiguration.vcenter.username + ':' + this.tempresourceConfiguration.vcenter.password, 'datastore': this.tempresourceConfiguration.datastore, 'cluster': this.tempresourceConfiguration.cluster, 'domain': this.tempresourceConfiguration.domain, 'network': this.tempresourceConfiguration.network, 'netgmre': this.tempresourceConfiguration.netgmre, 'netoamp': this.tempresourceConfiguration.netoamp, 'nete1': this.tempresourceConfiguration.nete1, 'nete2': this.tempresourceConfiguration.nete2, 'nete3': this.tempresourceConfiguration.nete3, 'ovfdefault': this.tempresourceConfiguration.ovftemplate.url, 'folder': this.tempresourceConfiguration.folder, 'nocores': this.tempresourceConfiguration.nocores, 'ramsize': this.tempresourceConfiguration.ramsize, 'mainshelf': this.tempresourceConfiguration.mainshelf, 'shelfmode': this.tempresourceConfiguration.shelfmode, 'neurl': this.tempresourceConfiguration.neurl, 'gmreurl': this.tempresourceConfiguration.gmreurl, 'oarurl': this.tempresourceConfiguration.oarurl, 'bootlevel': this.tempresourceConfiguration.bootlevel, 'runlevel': this.tempresourceConfiguration.runlevel, 'webserverurl': this.tempresourceConfiguration.webserverurl, 'webserverdir': this.tempresourceConfiguration.webserverdir };
			this.service.selectAPI(APIConstants.ADDRC_FILE, addrcfile)
				.subscribe((result) => {
					console.log(result, 'result at addResourceConfigurationfile');
					this.proceedeployvm(this.tempresourceConfiguration.name);
				}, (err) => {
					console.log(err.status);
				});
		} else {
			this.proceedeployvm(undefined);
		}
	}

	proceedeployvm(rcfile) {
		console.log('inise proceedeployvm');
		console.log('inside proceedeployvm fn');
		let sendValues = {
			rc: this.resourceconfig.replace('.cfg', ''),
			vmname: this.simplevmForm.get('vmname').value, ipaddress: this.simplevmForm.get('ipaddress').value, action: this.action, username: this.user_name
		};
		if (rcfile != '' && rcfile != undefined) {
			sendValues = {
				rc: rcfile,
				vmname: this.simplevmForm.get('vmname').value, ipaddress: this.simplevmForm.get('ipaddress').value, action: this.action, username: this.user_name
			};
		}
		if (this.simplevmForm.get('neloadurl').value != '') {
			sendValues['nfsmount'] = this.simplevmForm.get('neloadurl').value;
		}
		if (this.simplevmForm.get('nebuild').value != '') {
			sendValues['nebuild'] = this.simplevmForm.get('nebuild').value;
		}
		sendValues['mainshelf'] = this.simplevmForm.get('mastershelftype').value;
		sendValues['mode'] = this.simplevmForm.get('shelfmode').value;
		if (this.simplevmForm.get('localinstall').value) {
			sendValues['copylocally'] = 'True';
		}
		if (this.simplevmForm.get('valgrind').value) {
			sendValues['enablevalgrind'] = this.enablevalgrind;
		}
		if (this.simplevmForm.get('nodetid').value != '') {
			sendValues['nodetid'] = this.simplevmForm.get('nodetid').value;
		}
		if (this.simplevmForm.get('loopbackip').value != '') {
			sendValues['loopback'] = this.simplevmForm.get('loopbackip').value;
		}
		if (this.matrixsize != '') {
			sendValues['matrixsize'] = this.matrixsize;
		}
		if (this.simplevmForm.get('bootlevel').value != '') {
			sendValues['simbootlevel'] = this.simplevmForm.get('bootlevel').value;
		}
		if (this.simplevmForm.get('runlevel').value == 'ready') {
			sendValues['simrunlevel'] = this.simrunlevel;
		}
		if (this.simplevmForm.get('configuregmre').value) {

			if (this.simplevmForm.get('gmrebuild').value !== '') {
				sendValues['gmrebuild'] = this.simplevmForm.get('gmrebuild').value;
			}
			if (this.simplevmForm.get('gmreloadurl').value != '') {
				sendValues['gmreloadurl'] = this.simplevmForm.get('gmreloadurl').value;
			}
			if (this.simplevmForm.get('gmrenodeip').value != '') {
				sendValues['nodeip'] = this.simplevmForm.get('gmrenodeip').value;
			}
			if (this.simplevmForm.get('gmrenotifyip').value != '') {
				sendValues['notifyip'] = this.simplevmForm.get('gmrenotifyip').value;
			}
			if (this.simplevmForm.get('activategmre').value) {
				sendValues['enablegmre'] = this.simplevmForm.get('activategmre').value;
			}
		}
		if (this.simplevmForm.get('configureoar').value) {
			if (this.simplevmForm.get('oarbuild').value != '') {
				sendValues['oarbuild'] = this.simplevmForm.get('oarbuild').value;
			}
			if (this.simplevmForm.get('oarloadurl').value != '') {
				sendValues['oarloadurl'] = this.simplevmForm.get('oarloadurl').value;
			}
			if (this.simplevmForm.get('activateoar').value) {
				sendValues['enableoar'] = this.simplevmForm.get('activateoar').value;
			}
		}

		if (this.simplevmForm.get('noofcores').value > 1 && this.simplevmForm.get('noofcores').value < 9) {
			sendValues['nocores'] = this.simplevmForm.get('noofcores').value;
		}
		if ((this.simplevmForm.get('ramunit').value == 'mb' && (this.simplevmForm.get('ramsize').value > 3 && this.simplevmForm.get('ramsize').value < 1035265))
			|| (this.simplevmForm.get('ramunit').value == 'gb' && (this.simplevmForm.get('ramsize').value > 0 && this.simplevmForm.get('ramsize').value < 1010))) {
			let temp = this.simplevmForm.get('ramsize').value;
			if (this.simplevmForm.get('ramunit').value == 'gb') {
				temp = this.simplevmForm.get('ramsize').value * 1024;
			}
			if (temp != 2048) {
				sendValues['ramsize'] = temp;
			}
		}
		sendValues['username'] = this.userName;
		console.log('sendvalues:::::', sendValues);
		if (this.tempovf.product == 'WDM') {
			console.log(sendValues, 'send value at WDM');
			this.service.addAPI(APIConstants.DEPLOYVM, sendValues).subscribe((resultmsg) => {
				this.result = resultmsg;
				console.log(resultmsg, 'resultmsg');
				this.message = 'Deployment has started, please check the logs for more information.';
				this.dialogs.deployConfirm('Info', this.message, 'OK', 'deploy').subscribe((res) => {
					console.log('result from confirm:::', res);
					if (res) {
					}
				});
			});
		} else {
			// sendValues['username'] = this.userName;
			console.log('ongong ocs service');
			console.log('ovftemple', this.tempovf.name);
			if (this.tempovf.name != '') {
				sendValues['ovftemplate'] = this.tempovf.name;
			}
			console.log(sendValues, 'send value at ocs');
			this.service.addAPI(APIConstants.DEPLOYVMOCS, sendValues).subscribe((resultmsg) => {
				this.result = resultmsg;
				console.log(resultmsg, 'resultmsg');
				this.message = 'Deployment has started, please check the logs for more information.';
				this.dialogs.deployConfirm('Info', this.message, 'OK', 'deploy').subscribe((res) => {
					console.log('result from confirm:::', res);
					if (res) {
					}
				});
			});
		}
	}

}
