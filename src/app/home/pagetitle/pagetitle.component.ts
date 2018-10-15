import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataserviceService } from '../../services/dataservice.service';

@Component({
  selector: 'v1830-pagetitle',
  templateUrl: './pagetitle.component.html',
  styleUrls: ['./pagetitle.component.css']
})
export class PagetitleComponent implements OnInit {
  @Input() pagetitle: String = '';
  @Input() refreshbtn: boolean;
  @Input() addbtn: boolean;
  @Input() searchbtn: boolean;
  @Output() RefreshClickFromPageHeader = new EventEmitter();
  @Output() AddClickFromPageHeader = new EventEmitter();
  message: any;

  constructor(private data: DataserviceService) { }
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  onAddclick(event) {
    console.log('in page component');
    this.AddClickFromPageHeader.emit();
  }

  onRefreshClick() {
    this.RefreshClickFromPageHeader.emit();
  }

  applyFilter(filterValue) {
    console.log('filter value:::', filterValue);
    this.data.changeMessage(filterValue);
	}

}
