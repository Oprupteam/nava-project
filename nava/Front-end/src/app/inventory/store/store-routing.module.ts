import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CreateStoreComponent } from './create-store/create-store.component';
import { StoreComponent } from './store/store.component';
import { UpdateStoreComponent } from './update-store/update-store.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {
        path: 'store',
        component:StoreComponent,
      },
      {
        path: 'create-store',
        component:CreateStoreComponent,
      },
      {
        path: 'update-store/:id',
        component:UpdateStoreComponent,
      },

    
      // {
      //   path: 'print-store',
      //   component: PrintStoreComponent,
      // },



    ]
  },


];

@NgModule({
 imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class StoreRoutingModule { }
