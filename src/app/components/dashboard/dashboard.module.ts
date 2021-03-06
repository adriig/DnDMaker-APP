import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared-modules/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ForumComponent } from './forum/forum.component';
import { GamesComponent } from './games/games.component';
import { GuidesComponent } from './guides/guides.component';
import { ProfileComponent } from './profile/profile.component';
import { CharactersComponent } from './characters/characters.component';

import { AuthenticationButtonComponent } from './login/authentication-button/authentication-button.component';
import { LoginButtonComponent } from './login/login-button/login-button.component';
import { LogoutButtonComponent } from './login/logout-button/logout-button.component';
import { CheckComponent } from './characters/check/check.component';
import { CreateComponent } from './characters/create/create.component';

import { ClassesComponent } from './resources/classes/classes.component';
import { RacesComponent } from './resources/races/races.component';
import { CreateClassComponent } from './resources/classes/create-class/create-class.component';
import { CreateRacesComponent } from './resources/races/create-races/create-races.component';
import { CheckRacesComponent } from './resources/races/check-races/check-races.component';
import { GameComponent } from './games/game/game.component';
import { ManagementComponent } from './games/management/management.component';

import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ForumComponent,
    GamesComponent,
    GuidesComponent,
    ProfileComponent,
    CharactersComponent,
    AuthenticationButtonComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    CheckComponent,
    CreateComponent,
    ClassesComponent,
    RacesComponent,
    CreateClassComponent,
    CreateRacesComponent,
    CheckRacesComponent,
    GameComponent,
    ManagementComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class DashboardModule { }
