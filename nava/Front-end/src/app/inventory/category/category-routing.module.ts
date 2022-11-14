import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryComponent } from './category/category.component';

import { CreateCategoryComponent } from './create-category/create-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'category',
        component:CategoryComponent,
      },
      {
        path: 'create-category',
        component:CreateCategoryComponent,
      },
      {
        path: 'update-category/:id',
        component:UpdateCategoryComponent,
      },


      // {
      //   path: 'print-category',
      //   component: PrintCategoryComponent,
      // },



    ]
  },


];

@NgModule({
 imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class CategoryRoutingModule { }
