import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
 
import { Dashboard01Component } from './dashboard01/dashboard01.component';
import { Dashboard02Component } from './dashboard02/dashboard02.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard01',
        component: Dashboard01Component
      },
      {
        path: 'dashboard02',
        component: Dashboard02Component
      },
      // {
      //   path: 'dashboard-finance',
      //   component: DashboardFinanceComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class DashboardRoutingModule { }
