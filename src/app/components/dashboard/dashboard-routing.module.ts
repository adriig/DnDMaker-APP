import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { DashboardComponent } from './dashboard.component';
import { ForumComponent } from './forum/forum.component';
import { GamesComponent } from './games/games.component';
import { GuidesComponent } from './guides/guides.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthenticationButtonComponent } from './login/authentication-button/authentication-button.component'
import { LoginButtonComponent } from './login/login-button/login-button.component'
import { LogoutButtonComponent } from './login/logout-button/logout-button.component'
import { CheckComponent } from './characters/check/check.component'

import { CreateComponent } from './characters/create/create.component';
import { ClassesComponent } from './resources/classes/classes.component';
import { RacesComponent } from './resources/races/races.component';

import { CreateClassComponent } from './resources/classes/create-class/create-class.component'
import { CreateRacesComponent } from './resources/races/create-races/create-races.component'
import { CheckRacesComponent } from './resources/races/check-races/check-races.component'

import { GameComponent } from './games/game/game.component';
import { ManagementComponent } from './games/management/management.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', redirectTo: "forum", pathMatch: 'full'},
    { path: '', component: AuthenticationButtonComponent},
    { path: '', component: LoginButtonComponent},
    { path: '', component: LogoutButtonComponent},
    { path: 'forum', component: ForumComponent},
    { path: 'games', component: GamesComponent},
    { path: 'games/manage', component: ManagementComponent},
    { path: 'games/view/:id', component: GameComponent},
    { path: 'characters', component: CharactersComponent},
    { path: 'characters/detail/:id', component: CheckComponent},
    { path: 'characters/create', component: CreateComponent},
    { path: 'guides', component: GuidesComponent},
    { path: 'profile', component: ProfileComponent},

    { path: 'resources/classes', component: ClassesComponent},
    { path: 'resources/classes/create', component: CreateClassComponent},
    { path: 'resources/races', component: RacesComponent},
    { path: 'resources/classes/create', component: CreateClassComponent},
    { path: 'resources/races/create', component: CreateRacesComponent},
    { path: 'resources/races/detail/:id', component: CheckRacesComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
