import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeTypeRoutingModule } from './employee-type-routing.module';
import { EmployeeTypeComponent } from './employee-type/employee-type.component';
import { UpdateEmployeeTypeComponent } from './update-employee-type/update-employee-type.component';
import { AddEmployeeTypeComponent } from './add-employee-type/add-employee-type.component';
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


@NgModule({
  declarations: [
    EmployeeTypeComponent,
    UpdateEmployeeTypeComponent,
    AddEmployeeTypeComponent
  ],
  imports: [
    CommonModule,
    EmployeeTypeRoutingModule,
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
export class EmployeeTypeModule { }
