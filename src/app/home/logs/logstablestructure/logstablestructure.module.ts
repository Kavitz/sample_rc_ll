import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// tslint:disable-next-line:import-destructuring-spacing
import { MatButtonModule, MatSortModule , MatPaginatorModule , MatCheckboxModule , MatTableModule , MatDialogModule, MatInputModule, MatIcon, MatIconModule} from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LogstablestructureComponent } from './logstablestructure.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatSlideToggleModule,
    FormsModule ,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,

   ],
  declarations: [LogstablestructureComponent ],
  exports : [ LogstablestructureComponent]

})

export class LogstablestructureModule { }
