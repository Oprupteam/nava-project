import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AdvanceComponent } from './advance/advance.component';
import { ApproveAdvanceComponent } from './approve-advance/approve-advance.component';
import { NotificationAdvanceComponent } from './notification-advance/notification-advance.component';
import { RejectAdvanceComponent } from './reject-advance/reject-advance.component';
import { RequestAdvanceComponent } from './request-advance/request-advance.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component: AdvanceComponent
      },
      {
        path: 'advance-request',
        component: RequestAdvanceComponent
      },
      {
        path: 'approve-advance/:id',
        component: ApproveAdvanceComponent
      },
      {
        path: 'reject-advance/:id',
        component: RejectAdvanceComponent
      },
      {
        path:'notification-advance',
       component: NotificationAdvanceComponent
      }
      
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, TranslateModule]
})
export class AdvanceRoutingModule { }
