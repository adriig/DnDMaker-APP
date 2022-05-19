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

import { ResourcesComponent } from './resources/resources.component'

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', component: ForumComponent},
    { path: '', component: AuthenticationButtonComponent},
    { path: '', component: LoginButtonComponent},
    { path: '', component: LogoutButtonComponent},
    { path: 'games', component: GamesComponent},
    { path: 'characters', component: CharactersComponent},
    { path: 'characters/detail/:id', component: CheckComponent},
    { path: 'characters/create', component: CreateComponent},
    { path: 'guides', component: GuidesComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'resources', component: ResourcesComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
