import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AddInsuranceCompanyComponent } from './add-insurance-company/add-insurance-company.component';
import { InsuranceCompanyComponent } from './insurance-company/insurance-company.component';
import { UpdateInsuranceCompanyComponent } from './update-insurance-company/update-insurance-company.component';

const routes: Routes = [
  {
    path:"",
    children:[
        {
          path:"view",
          component:InsuranceCompanyComponent
          
        },
        {
          path:"update/:id",
          component:UpdateInsuranceCompanyComponent
        },
        {
          path:"add",
          component:AddInsuranceCompanyComponent
        }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class InsuranceCompanyRoutingModule { }
