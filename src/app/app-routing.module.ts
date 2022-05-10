import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LoginModule } from './components/login/login.module'

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(x => x.LoginModule)},
  { path: '', redirectTo: "login", pathMatch: 'full'},
  { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(x => x.DashboardModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
