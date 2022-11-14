import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CreateSubcategoryComponent } from './create-subcategory/create-subcategory.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { UpdateSubcategoryComponent } from './update-subcategory/update-subcategory.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {
        path: 'Subcategory',
        component:SubcategoryComponent,
      },
      {
        path: 'create-Subcategory',
        component:CreateSubcategoryComponent,
      },
      {
        path: 'update-Subcategory/:id',
        component:UpdateSubcategoryComponent,
      },

    ]
  },


];

@NgModule({
 imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class SubCategoryRoutingModule { }
