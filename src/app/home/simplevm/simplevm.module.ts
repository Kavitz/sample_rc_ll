import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpevmComponent } from './simpevm.component';
import { Routes, RouterModule } from '@angular/router';
import { MatSidenavModule, MatButtonToggleModule, MatButtonModule, MatListModule, MatToolbarModule, MatIconModule, MatInputModule, MatNativeDateModule, MatTooltipModule, MatFormFieldModule, MatAutocompleteModule, MatCheckboxModule, MatSelectModule, MatCardModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PagetitleModule } from '../pagetitle/pagetitle.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
  {path: '', component: SimpevmComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    PagetitleModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  declarations: [SimpevmComponent]
})
export class SimplevmModule { }
