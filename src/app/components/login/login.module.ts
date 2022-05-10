import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared-modules/shared.module';

import { LoginRoutingModule } from './login-routing.module'

import { LoginComponent } from './login.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { AuthenticationButtonComponent } from './authentication-button/authentication-button.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginButtonComponent,
    AuthenticationButtonComponent,
    LogoutButtonComponent],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule
  ],
})
export class LoginModule { }
