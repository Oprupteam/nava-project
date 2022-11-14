import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorComponent } from './vendor/vendor.component';
import { CreateVendorComponent } from './create-vendor/create-vendor.component';
import { UpdateVendorComponent } from './update-vendor/update-vendor.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ArchwizardModule } from 'angular-archwizard';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxDateRangeModule } from 'ngx-daterange';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxMaskModule } from 'ngx-mask';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { QuillModule } from 'ngx-quill';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AdvancedFormService } from 'src/app/components/forms/advanced-forms/advanced-form.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { searchFilterPipe } from './search-filter.pipe';


@NgModule({
  declarations: [
    VendorComponent,
    CreateVendorComponent,
    UpdateVendorComponent,
    searchFilterPipe,
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
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



    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers:[
    AdvancedFormService,
    ToastrService
  ]


})

export class VendorModule { }
