import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AddTopManagementComponent } from './add-top-management/add-top-management.component';
import { TopManagementComponent } from './top-management/top-management.component';
import { UpdateTopManagementComponent } from './update-top-management/update-top-management.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component: TopManagementComponent
      },
      {
        path: 'add',
        component: AddTopManagementComponent
      },
      {
        path: 'update',
        component: UpdateTopManagementComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class TopManagementRoutingModule { }
