import { Injectable } from '@angular/core';
import { SpinnerDialogComponent } from './spinner-dialog/spinner-dialog.component';
import { Observable } from 'rxjs/Observable';
import { MatDialogRef, MatDialog } from '@angular/material';
@Injectable()
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private dialog: MatDialog) { }
	confirm(progressbars:boolean): Observable<boolean> {
    console.log('called from vm');
    let dialogRef: MatDialogRef<SpinnerDialogComponent>;
    
    dialogRef = this.dialog.open(SpinnerDialogComponent, { disableClose: true , panelClass: 'customspinner'});
    if(!progressbars)
    {
      this.dialog.closeAll();
    }
		dialogRef.componentInstance.progressbar = progressbars;
	  return dialogRef.afterClosed();
	}
}
