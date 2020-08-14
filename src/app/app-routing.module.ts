import { AuthGuard } from './auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TablesComponent } from './tables/tables.component';
import { Login2Component } from './login2/login2.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'tables', component: TablesComponent },
      { path: 'page1', component: Page1Component, canActivate: [AuthGuard] },
      { path: 'page2', component: Page2Component, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent },
      // { path: 'pages/blank', component: BlankComponent },
      // {
      //   path: 'pages',
      //   children: [
      //     { path: 'blank', component: BlankComponent },
      //     { path: 'blank/:type', component: BlankComponent },
      //   ]
      // },
      {
        path: 'pages',
        loadChildren: () =>
          import('./pages/pages.module').then(m => m.PagesModule)
      },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'login2', component: Login2Component },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
