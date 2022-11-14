import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AddBenefitComponent } from './add-benefit/add-benefit.component';
import { BenefitComponent } from './benefit/benefit.component';
import { UpdateBenefitComponent } from './update-benefit/update-benefit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component: BenefitComponent
      },
      {
        path: 'add',
        component: AddBenefitComponent
      },
      {
        path: 'update/:id',
        component: UpdateBenefitComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class BenefitRoutingModule { }
