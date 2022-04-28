import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CharactersComponent } from './characters/characters.component';
import { DashboardComponent } from './dashboard.component';
import { ForumComponent } from './forum/forum.component';
import { GamesComponent } from './games/games.component';
import { GuidesComponent } from './guides/guides.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', component: ForumComponent},
    { path: 'games', component: GamesComponent},
    { path: 'characters', component: CharactersComponent},
    { path: 'guides', component: GuidesComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
