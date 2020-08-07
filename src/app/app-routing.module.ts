import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TablesComponent } from './tables/tables.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'tables', component: TablesComponent },
  { path: 'page1', component: Page1Component },
  { path: 'page2', component: Page2Component },
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
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
