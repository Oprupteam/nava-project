import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRequestComponent } from './item-request/item-request.component';
import { CreateItemRequestComponent } from './create-item-request/create-item-request.component';
import { UpdateItemRequestComponent } from './update-item-request/update-item-request.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
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
import { ItemRequestRoutingModule } from './itemRequest-routing.module';
import { NgxBarcodeModule } from 'ngx-barcode';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppComponent } from 'src/app/app.component';
import { DateFormat } from 'src/app/inventory/items/DateFormat ';
import { searchFilterPipe } from './search-filter.pipe';

@NgModule({
  declarations: [
    ItemRequestComponent,
    CreateItemRequestComponent,
    UpdateItemRequestComponent,
    searchFilterPipe,
  ],
  imports: [
    CommonModule,
    ItemRequestRoutingModule,
    NgxDropzoneModule,
    NgSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    SharedModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    NgxDatatableModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    ColorPickerModule,
    NgbModule,
    MatIconModule,
    MatStepperModule,
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
    Ng2SearchPipeModule,
  ],
  providers: [
    AdvancedFormService,
    ToastrService,
    { provide: DateAdapter, useClass: DateFormat },
  ],

  bootstrap: [AppComponent],
})
export class ItemRequestModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('en-in'); // DD/MM/YYYY
  }
}
