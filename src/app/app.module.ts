import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { VRoutingModule } from './v-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {
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
    MatFormFieldModule
} from '@angular/material';
import { HeaderComponent } from './shared/header/header.component';
import { APIService } from './services/apiservice.service';
import { UtilService } from './services/utils.service';
import { DialogsService } from './home/dialogs/dialogs.service';
import { DataserviceService } from './services/dataservice.service';

@NgModule({
    declarations: [
        FooterComponent,
        AppComponent,
        HeaderComponent
    ],
    imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        VRoutingModule,
        MatFormFieldModule,
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
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MatSortModule,
        MDBBootstrapModule.forRoot()
    ],
    providers: [APIService, UtilService, DialogsService, DataserviceService],
    bootstrap: [AppComponent]
})
export class AppModule { }
