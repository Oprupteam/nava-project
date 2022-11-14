import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { EmployeeComponent } from './employee/employee.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MoreDetailsComponent } from './more-details/more-details.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { AdvancedFormService } from 'src/app/components/forms/advanced-forms/advanced-form.service';
import { DateFormat } from './DateFormat';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HttpClientModule } from '@angular/common/http';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ArchwizardModule } from 'angular-archwizard';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxDateRangeModule } from 'ngx-daterange';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxMaskModule } from 'ngx-mask';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { QuillModule } from 'ngx-quill';
import { ContractComponent } from './contract/contract.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    MoreDetailsComponent,
    ContractComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
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
    ArchwizardModule,
    QuillModule.forRoot(),
    CKEditorModule,
    AngularEditorModule,
    NgxBarcodeModule,


    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers:[
    AdvancedFormService,
    ToastrService,
    { provide: DateAdapter, useClass: DateFormat }
  ],
  bootstrap: [AppComponent]

    
  
})
export class EmployeeModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale("en-in"); // DD/MM/YYYY
  }
 }
