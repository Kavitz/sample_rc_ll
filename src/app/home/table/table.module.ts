import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  declarations: [TableComponent],
  exports: [TableComponent]
})
export class TableModule { }
