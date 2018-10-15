import { Component, OnInit, Input, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
// tslint:disable-next-line:import-destructuring-spacing
import { MatTableDataSource, MatPaginator, MatSort, MatCheckboxModule, MatTableModule } from '@angular/material';
import { DataserviceService } from '../../../services/dataservice.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DialogsService } from '../../dialogs/dialogs.service';

@Component({
	selector: 'v1830-logstablestructure',
	templateUrl: './logstablestructure.component.html',
	styleUrls: ['./logstablestructure.component.css']
})
export class LogstablestructureComponent implements OnInit, OnChanges {
	@Input() columns: any[] = [];
	@Input() elements = [];

	pagetitle: string = 'Deplyment Logs';
	selectedLogs: Array<string> = [];
	value: any;
	hrvalue = false;
	deletebtn = true;
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@Output() viewClickFromlog = new EventEmitter<string>();
	@Output() deleteFromlog = new EventEmitter<string[]>();
	@Output() deletemultipleFromlog = new EventEmitter<string[]>();
	@Output() togglerefresh = new EventEmitter();
	@ViewChild(MatSort) sort: MatSort;
	private autorefreshlogtable = false;
	private ifautorefreshlogtable = false;
	displayedColumns: string[];
	message: any;

	selection: SelectionModel<any>;

	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {

		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		console.log('master toggle is called');
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	}
	constructor(private data: DataserviceService, private dialogs: DialogsService) { }

	ngOnInit() {
		this.createTableRows();
		this.data.currentMessage.subscribe((message) => {
			this.message = message;
			console.log('service:::', message);
			this.dataSource.filter = this.message;
		});
	}
	ngOnChanges() {
		this.createTableRows();
	}
	onViewClick(row) {
		this.viewClickFromlog.emit(row);
	}
	onDeleteClick() {
		console.log('log delete');
		this.selectedLogs.splice(0, this.selectedLogs.length);
		this.dataSource.data.filter((row) => {
			if (this.selection.isSelected(row)) {
				console.log('oree', row);
				this.selectedLogs.push(row.vmname);
			}

		});
		console.log('selected mmmmmrows:::', this.selectedLogs);
		this.dialogs.confirm('Delete Log', 'Are you sure you want to delete selected logs ?', 'Delete').subscribe((res) => {
			console.log('result from confirm:::', res);
			if (res) {
				console.log('selected mmmmmrows:::', this.selectedLogs);
				this.deletemultipleFromlog.emit(this.selectedLogs);
			} else {
				this.selection.clear();
			}
		});
	}
	onclear() {
		this.selection.clear();
	}

	createTableRows() {
		this.displayedColumns = this.columns.map(x => x.columnDef);
		this.displayedColumns.push('View');
		this.displayedColumns[0] = 'select';
		this.dataSource = new MatTableDataSource(this.elements);
		this.selection = new SelectionModel<any>(true, []);
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		console.log('datasource:::', this.dataSource);
	}

	updateChecked(option, event) {
		console.log('change is called');
		console.log('event.target.value ' + event.target.value);
	}

	toggelautorefreshTable() {
		console.log('refresh table:::');
		if (this.autorefreshlogtable) {
			this.ifautorefreshlogtable = true;
			this.togglerefresh.emit(true);
		} else {
			this.ifautorefreshlogtable = false;
			this.togglerefresh.emit(false);
		}
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
}


