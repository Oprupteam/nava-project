import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AddLeavesComponent } from './add-leaves/add-leaves.component';
import { LeavesComponent } from './leaves/leaves.component';
import { UpdateLeavesComponent } from './update-leaves/update-leaves.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component: LeavesComponent
      },
      {
        path: 'add',
        component: AddLeavesComponent
      },
      {
        path: 'update/:id',
        component: UpdateLeavesComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class LeavesRoutingModule { }
