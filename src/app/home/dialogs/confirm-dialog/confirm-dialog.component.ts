import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
@Component({
	selector: 'v1830-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
	title: string;
	message: string;
	buttonlabel: string;
	button3: string;
	constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
	}
}
