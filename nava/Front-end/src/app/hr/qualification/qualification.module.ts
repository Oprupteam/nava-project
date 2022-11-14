import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QualificationRoutingModule } from './qualification-routing.module';
import { QualificationComponent } from './qualification/qualification.component';
import { AddQualificationComponent } from './add-qualification/add-qualification.component';
import { UpdateQualificationComponent } from './update-qualification/update-qualification.component';
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
    QualificationComponent,
    AddQualificationComponent,
    UpdateQualificationComponent
  ],
  imports: [
    CommonModule,
    QualificationRoutingModule,
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
export class QualificationModule { }
