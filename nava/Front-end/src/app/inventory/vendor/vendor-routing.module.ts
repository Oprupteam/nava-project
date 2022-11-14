import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CreateVendorComponent } from './create-vendor/create-vendor.component';
import { UpdateVendorComponent } from './update-vendor/update-vendor.component';
import { VendorComponent } from './vendor/vendor.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'vendor',
      component:VendorComponent,
    },
    {
      path: 'create-vendor',
      component:CreateVendorComponent,
    },
    {
      path: 'update-vendor/:id',
      component:UpdateVendorComponent,
    },
  ]
},


];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule,TranslateModule]
})
export class VendorRoutingModule { }
