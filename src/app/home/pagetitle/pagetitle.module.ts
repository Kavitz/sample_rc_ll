import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagetitleComponent } from './pagetitle.component';
import { MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [PagetitleComponent],
  exports: [PagetitleComponent]
})
export class PagetitleModule { }
