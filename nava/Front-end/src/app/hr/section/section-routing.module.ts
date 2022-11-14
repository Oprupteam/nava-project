import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AddSectionComponent } from './add-section/add-section.component';
import { SectionComponent } from './section/section.component';
import { UpdateSectionComponent } from './update-section/update-section.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component: SectionComponent
      },
      {
        path: 'add',
        component: AddSectionComponent
      },
      {
        path: 'update/:id',
        component: UpdateSectionComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class SectionRoutingModule { }
