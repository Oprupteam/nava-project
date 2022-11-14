import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BenefitRoutingModule } from './benefit-routing.module';
import { AddBenefitComponent } from './add-benefit/add-benefit.component';
import { BenefitComponent } from './benefit/benefit.component';
import { UpdateBenefitComponent } from './update-benefit/update-benefit.component';
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
    BenefitComponent,
    AddBenefitComponent,
    UpdateBenefitComponent
  ],
  imports: [
    CommonModule,
    BenefitRoutingModule,
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
export class BenefitModule { }
