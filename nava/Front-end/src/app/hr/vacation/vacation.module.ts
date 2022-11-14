import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacationRoutingModule } from './vacation-routing.module';
import { AddVacationComponent } from './add-vacation/add-vacation.component';
import { VacationComponent } from './vacation/vacation.component';
import { UpdateVacationComponent } from './update-vacation/update-vacation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



@NgModule({
  declarations: [
    VacationComponent,
    AddVacationComponent,
    UpdateVacationComponent
  ],
  imports: [
    CommonModule,
    VacationRoutingModule,
    SharedModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgbModule,
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
export class VacationModule { }
