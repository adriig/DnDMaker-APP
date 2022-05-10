import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

import {AuthenticationButtonComponent } from './authentication-button/authentication-button.component'
import { LoginButtonComponent } from './login-button/login-button.component'
import { LogoutButtonComponent } from './logout-button/logout-button.component'

const routes: Routes = [
  { path: '', component: LoginComponent, children: [
    { path: '', component: AuthenticationButtonComponent},
    { path: '', component: LogoutButtonComponent},
    { path: 'characters', component: LoginButtonComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
