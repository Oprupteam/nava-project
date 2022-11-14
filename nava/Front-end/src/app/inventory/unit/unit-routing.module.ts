import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CreateUnitComponent } from './create-unit/create-unit.component';
import { UnitComponent } from './unit/unit.component';
import { UpdateUnitComponent } from './update-unit/update-unit.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'unit',
      component:UnitComponent,
    },
    {
      path: 'create-unit',
      component:CreateUnitComponent,
    },
    {
      path: 'update-unit/:id',
      component:UpdateUnitComponent,
    },

  ]
},

];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule,TranslateModule]
})
export class UnitRoutingModule { }
