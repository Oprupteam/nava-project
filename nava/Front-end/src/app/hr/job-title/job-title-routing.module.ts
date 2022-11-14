import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AddJobTitleComponent } from './add-job-title/add-job-title.component';
import { JobTitleComponent } from './job-title/job-title.component';
import { UpdateJobTitleComponent } from './update-job-title/update-job-title.component';

const routes: Routes = [
  {
    path:"",
    children:[
        {
          path:"view",
          component:JobTitleComponent
          
        },
        {
          path:"update/:id",
          component:UpdateJobTitleComponent
        },
        {
          path:"add",
          component:AddJobTitleComponent
        }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class JobTitleRoutingModule { }
