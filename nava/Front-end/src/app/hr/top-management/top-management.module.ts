import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopManagementRoutingModule } from './top-management-routing.module';
import { UpdateTopManagementComponent } from './update-top-management/update-top-management.component';
import { TopManagementComponent } from './top-management/top-management.component';
import { AddTopManagementComponent } from './add-top-management/add-top-management.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UpdateTopManagementComponent,
    TopManagementComponent,
    AddTopManagementComponent,
  ],
  imports: [
    CommonModule,
    TopManagementRoutingModule,
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
    SharedModule
  ]
})
export class TopManagementModule { }
