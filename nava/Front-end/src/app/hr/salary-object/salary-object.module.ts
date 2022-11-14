import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryObjectRoutingModule } from './salary-object-routing.module';
import { UpdateSalaryObjectComponent } from './update-salary-object/update-salary-object.component';
import { AddSalaryObjectComponent } from './add-salary-object/add-salary-object.component';
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
  import { SalaryObjectComponent } from './salary-object/salary-object.component';


@NgModule({
  declarations: [
    UpdateSalaryObjectComponent,
    AddSalaryObjectComponent,
    SalaryObjectComponent
  ],
  imports: [
    CommonModule,
    SalaryObjectRoutingModule,
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
export class SalaryObjectModule { }
