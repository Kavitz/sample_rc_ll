import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainResourcesComponent, AddEditResourcesComponent } from './main-resources.component';
import { Routes, RouterModule } from '@angular/router';
import { AddresourceComponent } from './addresource.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatButtonModule, MatSelectModule, MatTooltipModule, MatToolbarModule, MatNativeDateModule, MatIconModule, MatButtonToggleModule, MatCheckboxModule, MatDividerModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { PagetitleModule } from '../pagetitle/pagetitle.module';
import { TableModule } from '../table/table.module';
import { MatAutocompleteModule,
  MatInputModule,
  } from '@angular/material';
  import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {path: '', component: MainResourcesComponent},
  {path: 'addresource', component: AddresourceComponent}
];
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatStepperModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatCheckboxModule,
    TableModule,
    PagetitleModule,
    FormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDividerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainResourcesComponent, AddresourceComponent, AddEditResourcesComponent],
  entryComponents:[AddEditResourcesComponent],
  providers:[MainResourcesComponent]
})
export class ResourcesModule { }
