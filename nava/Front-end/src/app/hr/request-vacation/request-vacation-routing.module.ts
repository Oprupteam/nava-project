import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AddRequestVacationComponent } from './add-request-vacation/add-request-vacation.component';
import { RequestVacationComponent } from './request-vacation/request-vacation.component';
import { UpdateRequestVacationComponent } from './update-request-vacation/update-request-vacation.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component: RequestVacationComponent
      },

      {
        path: 'add',
        component: AddRequestVacationComponent
      },
      {
        path: 'update/:id',
        component: UpdateRequestVacationComponent
      },


      // {
      //   path: 'add',
      //   component: EmployeeComponent
      // },
      // {
      //   path: 'update/:id',
      //   component: UpdateBankComponent
      // }

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class RequestVacationRoutingModule {

 }
