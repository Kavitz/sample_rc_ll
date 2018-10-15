import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'v1830-spinner-dialog',
  templateUrl: './spinner-dialog.component.html',
  styleUrls: ['./spinner-dialog.component.css']
})
export class SpinnerDialogComponent implements OnInit {
  progressbar: boolean;
  ngOnInit(){
  }

	constructor(public dialogRef: MatDialogRef<SpinnerDialogComponent>) {
	}

}
