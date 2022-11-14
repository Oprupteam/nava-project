import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AddSalaryObjectComponent } from './add-salary-object/add-salary-object.component';
import { SalaryObjectComponent } from './salary-object/salary-object.component';
import { UpdateSalaryObjectComponent } from './update-salary-object/update-salary-object.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component: SalaryObjectComponent
      },
      {
        path: 'add',
        component: AddSalaryObjectComponent
      },
      {
        path: 'update/:id',
        component: UpdateSalaryObjectComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class SalaryObjectRoutingModule { }
