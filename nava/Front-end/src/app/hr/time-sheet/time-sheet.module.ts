import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeSheetRoutingModule } from './time-sheet-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { GenerateSheetComponent } from './generate-sheet/generate-sheet.component';
import { FormModule } from 'src/app/components/forms/forms.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter/src/ng2-filter.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxMaskModule } from 'ngx-mask';
import { ArchwizardModule } from 'angular-archwizard/lib/archwizard.module';
import { MatIconModule } from '@angular/material/icon';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxDateRangeModule } from 'ngx-daterange';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { QuillModule } from 'ngx-quill';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    GenerateSheetComponent
  ],
  imports: [
    CommonModule,
    TimeSheetRoutingModule,
    NgxDropzoneModule,
    NgSelectModule,

    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    NgSelectModule,
    NgSelectModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    SharedModule,
    SharedModule,
    NgSelectModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    NgSelectModule,
    NgxDatatableModule,
    NgbModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
     ColorPickerModule,

    NgSelectModule,
    MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatIconModule, MatStepperModule,
    NgxSliderModule,
    Ng2TelInputModule,
    NgxDaterangepickerMd.forRoot(),
    NgxDateRangeModule,
    NgxMaterialTimepickerModule,
    NgxDropzoneModule,
    ToastrModule,

    AngularEditorModule,


       NgxDropzoneModule,
    NgSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    NgSelectModule,
    NgSelectModule,
    MatSortModule,
    
    MatPaginatorModule,

    SharedModule,
    SharedModule,
    NgSelectModule,

    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    NgSelectModule,
    NgxDatatableModule,
    NgbModule,
    MatPaginatorModule,


    HttpClientModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    ColorPickerModule,
    NgbModule,
    NgSelectModule,
    MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatIconModule, MatStepperModule,
    NgxSliderModule,
    Ng2TelInputModule,
    NgxDaterangepickerMd.forRoot(),
    NgxDateRangeModule,
    NgxMaterialTimepickerModule,
    NgxDropzoneModule,
    ToastrModule,

    QuillModule.forRoot(),
    CKEditorModule,
    AngularEditorModule,


    ReactiveFormsModule,


  ]
})
export class TimeSheetModule { }
