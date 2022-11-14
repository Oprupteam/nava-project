import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { DepartmentComponent } from './department/department.component';
import { UpdateDepartmentComponent } from './update-department/update-department.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component: DepartmentComponent
      },
      {
        path: 'add',
        component: AddDepartmentComponent
      },
      {
        path: 'update/:id',
        component: UpdateDepartmentComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class DepartmentRoutingModule { }
