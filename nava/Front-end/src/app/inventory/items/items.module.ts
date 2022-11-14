import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items/items.component';
import { CreateItemsComponent } from './create-items/create-items.component';
import { UpdateItemsComponent } from './update-items/update-items.component';
import { PrintItemsComponent } from './print-items/print-items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
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
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
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
import { NgxBarcodeModule } from 'ngx-barcode';
import { DateFormat } from './DateFormat ';
import { AppComponent } from 'src/app/app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { searchFilterPipe } from './search-filter.pipe';


@NgModule({
  declarations: [
    ItemsComponent,
    CreateItemsComponent,
    UpdateItemsComponent,
    PrintItemsComponent,
    searchFilterPipe
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    NgbModule,
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
    NgxDropzoneModule,
    Ng2SearchPipeModule

  ],
  providers:[
    AdvancedFormService,
    ToastrService,
    { provide: DateAdapter, useClass: DateFormat }
  ],
  bootstrap: [AppComponent]

})
export class ItemsModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale("en-in"); // DD/MM/YYYY
  }
}
