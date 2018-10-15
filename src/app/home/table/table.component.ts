import { Component, OnInit, ViewChild, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataserviceService } from '../../services/dataservice.service';


@Component({
	selector: 'v1830-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {
	@Input() columns: any[] = [];
	@Input() elements = [];
	@Output() editClickFromPageHeader = new EventEmitter<string>();
	@Output() deleteClickFromPageHeader = new EventEmitter<string>();
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	displayedColumns: string[];
	message: any;
	constructor(private data: DataserviceService) { }

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

	createTableRows() {
		this.displayedColumns = this.columns.map(x => x.columnDef);
		this.displayedColumns.push('Edit/Delete');
		this.dataSource = new MatTableDataSource(this.elements);
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		console.log('datasource:::', this.dataSource);
	}

	onEditClick(row) {
		this.editClickFromPageHeader.emit(row);
	}
	onDeleteClick(row) {
		this.deleteClickFromPageHeader.emit(row);
	}
}


