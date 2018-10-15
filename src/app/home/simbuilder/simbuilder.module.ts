import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimbuilderComponent } from './simbuilder.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {path: '', component: SimbuilderComponent}
];
import { TableModule } from '../table/table.module';
import { PagetitleModule } from '../pagetitle/pagetitle.module';
import { MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatProgressBarModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatFormFieldModule
  } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileValidator } from '../simbuilder/input.file.validator';
import { FileValueAccessor } from '../simbuilder/file-control-value-accessor';
@NgModule({
  imports: [
    MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatProgressBarModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatFormFieldModule,
    CommonModule,
    RouterModule.forChild(routes),
    TableModule ,
    PagetitleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SimbuilderComponent, FileValidator, FileValueAccessor ]
})
export class SimbuilderModule { }
