import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MajorRoutingModule } from './major-routing.module';
import { UpdateMajorComponent } from './update-major/update-major.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMajorComponent } from './add-major/add-major.component';
import { MajorComponent } from './major/major.component';


@NgModule({
  declarations: [
    MajorComponent,
    AddMajorComponent,
    UpdateMajorComponent
  ],
  imports: [
    CommonModule,
    MajorRoutingModule,
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
    ReactiveFormsModule
  ]
})
export class MajorModule { }
