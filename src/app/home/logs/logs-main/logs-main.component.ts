import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { APIService } from '../../../services/apiservice.service';
import { APIConstants } from '../../../services/constants';
import { DialogsService } from '../../dialogs/dialogs.service';
import { DataserviceService } from '../../../services/dataservice.service';
export interface Deployment {
	vmname: string;
	username: string;
	status: string;
	starttime: string;
	endtime: string;
}
export interface DialogData {
	title: string;
	logdata: string;
}
@Component({
	selector: 'v1830-logs-main',
	templateUrl: './logs-main.component.html',
	styleUrls: ['./logs-main.component.css']
})
export class LogsMainComponent implements OnInit, AfterViewInit, OnDestroy {
	elements: any;
	logMessage: any;
	title: any;
	private autoRefresh: any;
	autorefreshlog = true;
	private autorefreshtable: any;
	private autorefreshlogtable = false;
	private ifautorefreshlogtable = false;
	private ifautorefreshlog = true;
	togglerefresh = true;
	deletebtn = true;
	hrvalue = true;
	message: string;
	animal: string;
	name: string;
	pagetitle = 'Deplyment Logs';
	columns: { columnDef: string; header: string; width: string; dispcolumn: boolean; cell: (element: any) => string; }[] = [
		{ columnDef: 'seelect', header: 'Select', width: '5%', dispcolumn: false, cell: (element: any) => `${''}` },
		{ columnDef: 'vname', header: 'VM Name', width: '20%', dispcolumn: false, cell: (element: any) => `${element.vmname}` },
		{ columnDef: 'username', header: 'User Name', width: '10%', dispcolumn: false, cell: (element: any) => `${element.username}` },
		{ columnDef: 'status', header: 'Status', width: '10%', dispcolumn: false, cell: (element: any) => `${element.status}` },
		{ columnDef: 'starttime', header: 'Start Time', width: '20%', dispcolumn: false, cell: (element: any) => `${element.starttime}` },
		{ columnDef: 'endtime', header: 'End time', width: '20%', dispcolumn: false, cell: (element: any) => `${element.endtime}` }

	];

	constructor(private service: APIService, private dialogs: DialogsService, private data: DataserviceService, public dialog: MatDialog) {
		console.log('deployment is called');
		this.service.getAPI(APIConstants.RETRIEVE_VMS).subscribe((vmlist) => {
			this.elements = vmlist;
			console.log('deployment elements:::', this.elements);
		});
	}
	onRefreshClick() {
		console.log('refreshing table:::');
		this.service.getAPI(APIConstants.RETRIEVE_VMS).subscribe((vmlist) => {
			this.elements = vmlist;
			console.log('deployment elements:::', this.elements);
		});
	}
	ngOnInit() {
	}
	onView(row) {
		this.title = row.vmname;
		console.log('row value::::', row.vmname);
		this.service.selectLogAPI(APIConstants.RETRIEVE_LOGS, row.vmname).subscribe((log) => {
			this.logMessage = log;
			if (log) {
				console.log('inside if:::', this.title);
				const dialogRef = this.dialog.open(LogdataviewComponent, {
					data: { title: row.vmname, logdata: this.logMessage }
				});
				dialogRef.afterClosed().subscribe(result => {
					console.log('The dialog was closed');
					this.autorefreshlog = false;
					clearInterval(this.autoRefresh);
				});
			} else {
				console.log('inside else:::', this.title);
				const dialogRef = this.dialog.open(LogdataviewComponent, {
					data: { title: row.vmname, logdata: 'No log data found' }
				});
				dialogRef.afterClosed().subscribe(result => {
					console.log('The dialog was closed');
					this.autorefreshlog = false;
					clearInterval(this.autoRefresh);
				});
			}
		});
	}
	onDeleteMutiple(row: string) {
		console.log('delete multiple');
		this.service.deletelogAPI(APIConstants.DELETE_DEPLOYMENTLOG, row)
			.subscribe((logmsg) => {
				console.log('delete logmsg:::', logmsg);
				this.onRefreshClick();
				if (logmsg.affectedRows === 1) {
					console.log('deleted row');
					this.onRefreshClick();
				}
			}, (err) => {
				console.log('not delted');

			});
	}
	onDelete(row: string) {
		console.log('delete is clicked', row);
		this.dialogs.confirm('Delete Log', 'Are you sure you want to delete selected logs ?', 'Delete').subscribe((res) => {
			console.log('result from confirm:::', res);
			if (res) {
				console.log('delete name:::', row);
				this.service.deletelogAPI(APIConstants.DELETE_DEPLOYMENTLOG, row)
					.subscribe((logmsg) => {
						console.log('delete logmsg:::', logmsg);
						this.onRefreshClick();
						if (logmsg.affectedRows === 1) {
							console.log('deleted row');
							this.onRefreshClick();
						}
					}, (err) => {
						console.log('not delted');

					});
			}
		});
	}
	ngAfterViewInit() {
		if (this.autorefreshlogtable) {
			this.autorefreshtable = setInterval(() => {
				this.onRefreshClick();
			}, 30000);
		}
	}

	ngOnDestroy() {
		if (this.autorefreshtable) {
			clearInterval(this.autorefreshtable);
		}
	}
	closeLogWindow() {
		if (this.autoRefresh) {
			clearInterval(this.autoRefresh);
		}
	}
	toggelautorefreshTable(check) {
		console.log('refresh table:::', check);
		if (check) {
			this.autorefreshtable = setInterval(() => {
				this.onRefreshClick();
			}, 30000);
		} else {
			clearInterval(this.autorefreshtable);
		}
	}



}

@Component({
	selector: 'v1830-logdataview',
	templateUrl: './logdataview.component.html'
})
export class LogdataviewComponent implements AfterViewInit, OnDestroy {

	private autoRefresh: any;
	private autorefreshlog = true;
	private autorefreshtable: any;
	private autorefreshlogtable = false;
	private ifautorefreshlogtable = false;
	private ifautorefreshlog = true;
	private autoscrolllog = true;
	@ViewChild('scrollMe') private myScrollContainer: ElementRef;
	title: any;
	logdata: any;
	constructor(public dialogRef: MatDialogRef<LogdataviewComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private obj: LogsMainComponent, private service: APIService) { }
	ngAfterViewInit() {
		console.log('title afterviewinit():::', this.autorefreshlog);
		if (this.autorefreshlog) {
			this.check(this.data.title);
		}
		console.log('ongj value:::', this.obj.autorefreshlog);
	}
	close() {
		this.dialogRef.close();
		clearInterval(this.autoRefresh);
		console.log('close is called');
	}
	onNoClick(): void {
		this.dialogRef.close();
		clearInterval(this.autoRefresh);
	}
	ngOnDestroy() {
		if (this.autorefreshlog) {
			clearInterval(this.autorefreshtable);
		}
	}
	check(value) {
		console.log('check is called:::', this.autorefreshlog);
		this.dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed down');
			this.autorefreshlog = false;
			clearInterval(this.autoRefresh);
		  });
		this.autoRefresh = setInterval(() => {
			console.log('before if', this.autorefreshlog);
			if (this.autorefreshlog) {
				console.log('inside if', this.autorefreshlog);
				this.refreshlogs(value);
			} else {
				console.log('in check:::');
				clearInterval(this.autoRefresh);
			}
		}, 15000);
	}
	closeLogWindow() {
		if (this.autoRefresh) {
			clearInterval(this.autoRefresh);
		}
	}
	change(autorefreshlog, value) {
		console.log('toggle change is called:::');
		if (this.autorefreshlog) {
			this.ifautorefreshlog = true;
			this.autoRefresh = setInterval(() => {
				this.refreshlogs(value);
			}, 15000);
		} else {

			this.ifautorefreshlog = false;
			clearInterval(this.autoRefresh);
			this.closeLogWindow();
		}
	}

	refreshlogs(value) {
		console.log('refresh logs');
		console.log('row value::::', value);
		this.title = value;
		if (this.autorefreshlog) {
			this.service.selectLogAPI(APIConstants.RETRIEVE_LOGS, value).subscribe((log) => {
				if (log) {
					this.data.logdata = log;
					if (this.autoscrolllog) {
						this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
					} else {
						this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.this.myScrollContainer.nativeElement.scrollTop;
					}
				} else {
					this.data.logdata = 'no log is found after refresh';
				}

			});
		}
	}

	refresh(value) {
		console.log('refresh title:::', value);
		this.service.selectLogAPI(APIConstants.RETRIEVE_LOGS, value).subscribe((log) => {
			if (log) {
				this.data.logdata = log;
			} else {
				this.data.logdata = 'No log data found.';
			}
		});
	}

}

