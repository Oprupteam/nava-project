import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AddAccountComponent } from './chart-account/add-account/add-account.component';
import { ChartAccountComponent } from './chart-account/chart-account.component';
import { UpdateAccountComponent } from './chart-account/update-account/update-account.component';
import { OrderStatisticsComponent } from './order-statistics/order-statistics.component';

const routes: Routes = [
  {
    path: 'ChartAccount',
    children: [
      {
        path: '',
        component: ChartAccountComponent
      },
      {
        path: 'add',
        component: AddAccountComponent
      },
      {
        path: 'update/:id',
        component: UpdateAccountComponent
      },
      {
        path: 'order-statistics',
        component: OrderStatisticsComponent,
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class FinanceRoutingModule { }
