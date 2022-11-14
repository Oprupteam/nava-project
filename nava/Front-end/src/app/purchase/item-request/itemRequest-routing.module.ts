import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CreateItemRequestComponent } from './create-item-request/create-item-request.component';
import { ItemRequestComponent } from './item-request/item-request.component';
import { UpdateItemRequestComponent } from './update-item-request/update-item-request.component';

const routes: Routes =  [{
  path: '',
  children: [
    {
      path: 'itemRequest',
      component:ItemRequestComponent,
    },
    {
      path: 'create-itemRequest',
      component:CreateItemRequestComponent,
    },
    {
      path: 'update-itemRequest/:id',
      component:UpdateItemRequestComponent,
    },
  ]
},
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule,TranslateModule]
})

export class ItemRequestRoutingModule { }
