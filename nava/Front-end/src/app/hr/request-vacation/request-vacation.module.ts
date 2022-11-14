import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestVacationRoutingModule } from './request-vacation-routing.module';
import { RequestVacationComponent } from './request-vacation/request-vacation.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxSliderModule } from '@angular-slider/ngx-slider/public_api';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { MatFormFieldModule } from '@angular/material/form-field';


import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { NgSelectModule } from '@ng-select/ng-select';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxDateRangeModule } from 'ngx-daterange';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ArchwizardModule } from 'angular-archwizard';
import { NgxBarcodeModule } from 'ngx-barcode';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { QuillModule } from 'ngx-quill';
import { AddRequestVacationComponent } from './add-request-vacation/add-request-vacation.component';
import { UpdateRequestVacationComponent } from './update-request-vacation/update-request-vacation.component';


@NgModule({
  declarations: [
    RequestVacationComponent,
    AddRequestVacationComponent,
    UpdateRequestVacationComponent,

  ],
  imports: [
    CommonModule,
    RequestVacationRoutingModule,

    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSelectModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    SharedModule,
    SharedModule,
    MatSelectModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    NgbModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
    
    ColorPickerModule,
    NgbModule,
    NgSelectModule,
    MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatIconModule, MatStepperModule,


    NgxDaterangepickerMd.forRoot(),
    NgxDateRangeModule,
    NgxMaterialTimepickerModule,


    ArchwizardModule,
    QuillModule.forRoot(),
    CKEditorModule,
    AngularEditorModule,
    NgxBarcodeModule,

  ]
})
export class RequestVacationModule { }
