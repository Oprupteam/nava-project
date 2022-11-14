import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvanceRoutingModule } from './advance-routing.module';
import { AdvanceComponent } from './advance/advance.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApproveAdvanceComponent } from './approve-advance/approve-advance.component';
import { RejectAdvanceComponent } from './reject-advance/reject-advance.component';
import { RequestAdvanceComponent } from './request-advance/request-advance.component';
import { NotificationAdvanceComponent } from './notification-advance/notification-advance.component';


@NgModule({
  declarations: [
    AdvanceComponent,
    ApproveAdvanceComponent,
    RejectAdvanceComponent,
    RequestAdvanceComponent,
    NotificationAdvanceComponent,
  ],
  imports: [
    CommonModule,
    AdvanceRoutingModule,
    SharedModule,
    NgSelectModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    NgSelectModule,
    NgxDatatableModule,
    NgbModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdvanceModule { }
