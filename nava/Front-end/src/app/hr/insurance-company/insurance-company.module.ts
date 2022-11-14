import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceCompanyRoutingModule } from './insurance-company-routing.module';
import { InsuranceCompanyComponent } from './insurance-company/insurance-company.component';
import { UpdateInsuranceCompanyComponent } from './update-insurance-company/update-insurance-company.component';
import { AddInsuranceCompanyComponent } from './add-insurance-company/add-insurance-company.component';
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
    InsuranceCompanyComponent,
    UpdateInsuranceCompanyComponent,
    AddInsuranceCompanyComponent
  ],
  imports: [
    CommonModule,
    InsuranceCompanyRoutingModule,
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
export class InsuranceCompanyModule { }
