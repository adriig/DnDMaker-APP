import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { LoginComponent } from './components/login/login.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared-modules/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { default as authFile } from '../../auth_config.json';


@NgModule({
  declarations: [
    AppComponent,
    //LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    MatFormFieldModule,
    AuthModule.forRoot({
      domain: authFile.domain,
      clientId: authFile.clientId,
      redirectUri: window.location.origin
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
