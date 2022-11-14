import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AddMajorComponent } from './add-major/add-major.component';
import { MajorComponent } from './major/major.component';
import { UpdateMajorComponent } from './update-major/update-major.component';

const routes: Routes = [

  {
    path:"",
    children:[
        {
          path:"view",
          component:MajorComponent
          
        },

        {
          path:"update/:id",
          component:UpdateMajorComponent
        },
        {
          path:"add",
          component:AddMajorComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class MajorRoutingModule { }
