import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AddEmployeeTypeComponent } from './add-employee-type/add-employee-type.component';
import { EmployeeTypeComponent } from './employee-type/employee-type.component';
import { UpdateEmployeeTypeComponent } from './update-employee-type/update-employee-type.component';

// import * as path from 'path';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component: EmployeeTypeComponent
      },
      {
        path: 'add',
        component: AddEmployeeTypeComponent
      },
      {
        path: 'update/:id',
        component: UpdateEmployeeTypeComponent
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, TranslateModule]
})
export class EmployeeTypeRoutingModule { }
