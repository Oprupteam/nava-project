import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ContractComponent } from './contract/contract.component';
import { EmployeeComponent } from './employee/employee.component';
import { MoreDetailsComponent } from './more-details/more-details.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component: EmployeeComponent
      },

      {
        path: 'add',
        component: AddEmployeeComponent
      },
      {
        path: 'update/:id',
        component: UpdateEmployeeComponent
      },
      {
        path: 'more-details/:id',
        component: MoreDetailsComponent
      },
      {
        path: 'contract/:id',
        component: ContractComponent
      }


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
export class EmployeeRoutingModule { }
