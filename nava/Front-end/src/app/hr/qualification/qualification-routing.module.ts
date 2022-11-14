import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AddQualificationComponent } from './add-qualification/add-qualification.component';
import { QualificationComponent } from './qualification/qualification.component';
import { UpdateQualificationComponent } from './update-qualification/update-qualification.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component: QualificationComponent
      },
      {
        path: 'add',
        component: AddQualificationComponent
      },
      {
        path: 'update/:id',
        component: UpdateQualificationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,
    TranslateModule]
})
export class QualificationRoutingModule { }
