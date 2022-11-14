import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './shared/guard/admin.guard';
import { ContentLayoutComponent } from './shared/layout-components/layout/content-layout/content-layout.component';
import { ErrorLayoutComponent } from './shared/layout-components/layout/error-layout/error-layout.component';
import { FullLayoutComponent } from './shared/layout-components/layout/full-layout/full-layout.component';
import { SwitcherLayoutComponent } from './shared/layout-components/layout/switcher-layout/switcher-layout.component';
import { customRoute } from './shared/routes/custom.routes';
import { errorRoute } from './shared/routes/error.routes';
import { content } from './shared/routes/routes';
import { switcher } from './shared/routes/switcher.routes';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/dashboard01',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    // canActivate: [AdminGuard],
    children: content
  },
  {
    path: '',
    component: SwitcherLayoutComponent,
    // canActivate: [AdminGuard],
    children: switcher
  },
  {
    path: '',
    component: ErrorLayoutComponent,
    // canActivate: [AdminGuard],
    children: errorRoute
  },
  {
    path: '',
    component: FullLayoutComponent,
    // canActivate: [AdminGuard],
    children: customRoute
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule, TranslateModule]
})
export class AppRoutingModule { }
