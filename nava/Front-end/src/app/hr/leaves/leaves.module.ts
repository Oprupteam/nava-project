import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeavesRoutingModule } from './leaves-routing.module';
import { AddLeavesComponent } from './add-leaves/add-leaves.component';
import { LeavesComponent } from './leaves/leaves.component';
import { UpdateLeavesComponent } from './update-leaves/update-leaves.component';
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
    LeavesComponent,
    AddLeavesComponent,
    UpdateLeavesComponent
  ],
  imports: [
    CommonModule,
    LeavesRoutingModule,
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
export class LeavesModule { }
