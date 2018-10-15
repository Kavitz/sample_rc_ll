import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
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
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { DialogsService } from './dialogs/dialogs.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


const routes: Routes = [
  {path: 'home', component: HomeComponent,
  children : [
    { path: '', redirectTo: 'simplevm', pathMatch: 'prefix' },
    { path: 'vcenter', loadChildren: './vcenter/vcenter.module#VcenterModule' },
    { path: 'ovf', loadChildren: './ovf/ovf.module#OvfModule'},
    { path: 'simplevm', loadChildren: './simplevm/simplevm.module#SimplevmModule'},
    { path: 'resources', loadChildren: './resources/resources.module#ResourcesModule'},
    { path: 'logs/deployment', loadChildren: './logs/logs.module#LogsModule'},
    { path: 'logs/upgrade', loadChildren: './logs/logs.module#LogsModule'},
    { path: 'logs/simbuilder', loadChildren: './logs/logs.module#LogsModule'},
    { path: 'manageusers', loadChildren: './users/users.module#UsersModule'},
    { path: 'simbuilder', loadChildren: './simbuilder/simbuilder.module#SimbuilderModule'},
  ]
}
];

@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
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
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    MatSortModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [HomeComponent, MenuComponent, ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent],
  providers: [DialogsService]
})
export class HomeModule { }
