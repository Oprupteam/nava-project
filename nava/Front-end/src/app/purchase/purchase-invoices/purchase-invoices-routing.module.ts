import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CreatePurchaseInvoicesComponent } from './create-purchase-invoices/create-purchase-invoices.component';
import { PrintPurchaseInvoicesComponent } from './print-purchase-invoices/print-purchase-invoices.component';
import { PurchaseInvoicesComponent } from './purchase-invoices/purchase-invoices.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'purchaseInvoices',
      component:PurchaseInvoicesComponent,
    },
    {
      path: 'create-purchaseInvoices',
      component:CreatePurchaseInvoicesComponent,
    },
    {
      path: 'print-purchaseInvoices/:id',
      component:PrintPurchaseInvoicesComponent,
    },
  ]
},
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule,TranslateModule]
})

export class PurchaseInvoicesRoutingModule { }
