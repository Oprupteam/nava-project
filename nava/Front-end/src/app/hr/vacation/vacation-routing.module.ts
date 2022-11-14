import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AddVacationComponent } from './add-vacation/add-vacation.component';
import { VacationComponent } from './vacation/vacation.component';
import { UpdateVacationComponent } from './update-vacation/update-vacation.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component: VacationComponent
      },
      {
        path: 'add',
        component: AddVacationComponent
      },
      {
        path: 'update/:id',
        component: UpdateVacationComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class VacationRoutingModule { }
