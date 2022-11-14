import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CompanyComponent } from './company/company.component';
import { UpdateCompanyComponent } from './update-company/update-company.component';

const routes: Routes = [

  {
    path:"",
    children:[
        {
          path:"view",
          component:CompanyComponent

        },

        {
          path:"update",
          component:UpdateCompanyComponent
        },
        {
          path:"add",
          component:AddCompanyComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class CompanyRoutingModule { }
