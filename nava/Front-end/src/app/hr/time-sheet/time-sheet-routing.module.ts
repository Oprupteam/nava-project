import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GenerateSheetComponent } from './generate-sheet/generate-sheet.component';

const routes: Routes = [
  { path: '',
     children: [

       {
         path: 'sheet',
         component: GenerateSheetComponent,
       },


     ]
   },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class TimeSheetRoutingModule { }
