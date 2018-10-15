
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
@Injectable()
export class DialogsService {
	constructor(private dialog: MatDialog) { }
	confirm(title: string, message: string, buttonlabel: string): Observable<boolean> {
		let dialogRef: MatDialogRef<ConfirmDialogComponent>;
		dialogRef = this.dialog.open(ConfirmDialogComponent, { disableClose: true });
		dialogRef.componentInstance.title = title;
		dialogRef.componentInstance.message = message;
		dialogRef.componentInstance.buttonlabel = buttonlabel;
		return dialogRef.afterClosed();
	}
	deployConfirm(title: string, message: string, buttonlabel: string, deploymsg: string): Observable<boolean> {
		let dialogRef: MatDialogRef<ConfirmDialogComponent>;
		dialogRef = this.dialog.open(ConfirmDialogComponent, { disableClose: true });
		dialogRef.componentInstance.title = title;
		dialogRef.componentInstance.message = message;
		dialogRef.componentInstance.buttonlabel = buttonlabel;
		dialogRef.componentInstance.button3 = deploymsg;
		return dialogRef.afterClosed();
}	
}
