import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { ChartAccountComponent } from './chart-account/chart-account.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatSelectModule } from '@angular/material/select';
import { AddAccountComponent } from './chart-account/add-account/add-account.component';
import { UpdateAccountComponent } from './chart-account/update-account/update-account.component';
import { OrderStatisticsComponent } from './order-statistics/order-statistics.component';
import { OrderReportsComponent } from './order-reports/order-reports.component';


@NgModule({
  declarations: [
    ChartAccountComponent,
    AddAccountComponent,
    UpdateAccountComponent,
    OrderStatisticsComponent,
    OrderReportsComponent
  ],
  imports: [
    CommonModule,
    FinanceRoutingModule,
   SharedModule,
    NgSelectModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    NgxDatatableModule,
    NgbModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    MatSelectModule,
    MatSortModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule

  ]
})
export class FinanceModule { }
