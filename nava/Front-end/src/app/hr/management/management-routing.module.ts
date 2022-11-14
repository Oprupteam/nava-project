import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AddManagementComponent } from './add-management/add-management.component';
import { ManagementComponent } from './management/management.component';
import { UpdateManagementComponent } from './update-management/update-management.component';

// import * as path from 'path';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component: ManagementComponent
      },
      {
        path: 'add',
        component: AddManagementComponent
      },
      {
        path: 'update/:id',
        component: UpdateManagementComponent
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, TranslateModule]
})
export class ManagementRoutingModule { }
