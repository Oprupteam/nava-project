import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { ResisterComponent } from './resister/resister.component';

const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  { path: 'auth/register', component: ResisterComponent },
  { path: 'auth/forgot-password', component: ForgetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
