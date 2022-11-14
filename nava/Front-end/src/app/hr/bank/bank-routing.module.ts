import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AddBankComponent } from './add-bank/add-bank.component';
import { BankComponent } from './bank/bank.component';
import { UpdateBankComponent } from './update-bank/update-bank.component';

// import * as path from 'path';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component: BankComponent
      },
      {
        path: 'add',
        component: AddBankComponent
      },
      {
        path: 'update/:id',
        component: UpdateBankComponent
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, TranslateModule]
})
export class BankRoutingModule { }
