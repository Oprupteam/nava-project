import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AddUniversityComponent } from './add-university/add-university.component';
import { UniversityComponent } from './university/university.component';
import { UpdateUniversityComponent } from './update-university/update-university.component';

// import * as path from 'path';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component: UniversityComponent
      },
      {
        path: 'add',
        component: AddUniversityComponent
      },
      {
        path: 'update/:id',
        component: UpdateUniversityComponent
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, TranslateModule]
})
export class UniversityRoutingModule { }
