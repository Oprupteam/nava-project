import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CreateLocalPurchaceOrderComponent } from './create-local-purchace-order/create-local-purchace-order.component';
import { LocalPurchaceOrderComponent } from './local-purchace-order/local-purchace-order.component';
import { PrintLocalPurchaceOrderComponent } from './printLocalPurchaceOrder/printLocalPurchaceOrder.component';

const routes: Routes = [
  {path: '',
    children: [
      {
        path: 'LocalPurchaceOrder',
        component: LocalPurchaceOrderComponent,
      },
      {
        path: 'create-LocalPurchaceOrder',
        component: CreateLocalPurchaceOrderComponent,
      },

      {
        path:'print-LocalPurchaceOrder/:id',
        component:PrintLocalPurchaceOrderComponent,
      }
    ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})

export class LocalPurchaceOrderRoutingModule { }
