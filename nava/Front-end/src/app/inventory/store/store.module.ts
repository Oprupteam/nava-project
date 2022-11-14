import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store/store.component';
import { CreateStoreComponent } from './create-store/create-store.component';
import { UpdateStoreComponent } from './update-store/update-store.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatIconModule } from '@angular/material/icon';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxDateRangeModule } from 'ngx-daterange';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ArchwizardModule } from 'angular-archwizard';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { QuillModule } from 'ngx-quill';
import { AdvancedFormService } from 'src/app/components/forms/advanced-forms/advanced-form.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { searchFilterPipe } from './search-filter.pipe';


@NgModule({
  declarations: [
    StoreComponent,
    CreateStoreComponent,
    UpdateStoreComponent,
    searchFilterPipe,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule,
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
export class StoreModule { }
