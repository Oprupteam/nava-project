import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankRoutingModule } from './bank-routing.module';
import { BankComponent } from './bank/bank.component';
import { UpdateBankComponent } from './update-bank/update-bank.component';
import { AddBankComponent } from './add-bank/add-bank.component';
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
    BankComponent,
    UpdateBankComponent,
    AddBankComponent
  ],
  imports: [
    CommonModule,
    BankRoutingModule,
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
export class BankModule { }
