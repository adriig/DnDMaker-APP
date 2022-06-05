import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { max } from 'rxjs';
import { Game } from 'src/app/models/game/game';
import { GamesService } from 'src/app/services/gameService/games.service';
import { v4 as uuidv4 } from 'uuid';
import { LoginButtonComponent } from '../../login/login-button/login-button.component';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  gameForm: FormGroup;

  games: Map<string, Game> = new Map<string, Game>();
  profileId: string = "none";

  constructor(private formBuilder: FormBuilder, public auth: AuthService, private gameService: GamesService) {
    this.gameForm = formBuilder.group({
      name: ['', Validators.required],
      maxPlayers: ['8'],
    });
  }

  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      if (profile?.sub == undefined) {
        return;
      }
      this.profileId = profile.sub
      this.gameService.getGamesFrom(this.profileId)
        .subscribe((data) => {
          for (const game of data) {
            this.games.set(game._id, game)
          }
        })
    });
  }

  createGame(): void {
    if (this.profileId == "none") {
      return;
    }

    let maxPlayers: number;
    if (this.gameForm.get("maxPlayers")?.value != null) {
      maxPlayers = this.gameForm.get("maxPlayers")?.value
    } else {
      maxPlayers = 8
    }

    const game = new Game(
      uuidv4(),
      this.gameForm.get('name')?.value,
      this.profileId,
      maxPlayers,
      new Date(),
      [this.profileId] // agregamos al creador del juego
    );

    this.gameService.createGame(game).subscribe();
    this.games.set(game._id, game)
    this.reset()
  }

  deleteGame(gameId: string): void {
    this.games.delete(gameId);
    this.gameService.deleteGame(gameId).subscribe();
    this.gameService.deleteGameRequestFromGame(gameId).subscribe();
    this.gameService.deleteInvite(gameId).subscribe();
  }

  reset(): void {
    this.gameForm.reset();
    this.getMaxPlayers().value = "8"
    this.slider()
  }

  slider(): void {
    this.getMaxPlayersValue()!.innerHTML = this.getMaxPlayers().value
  }

  getMaxPlayers(): HTMLInputElement {
    return <HTMLInputElement>document.getElementById("maxPlayers");
  }

  getMaxPlayersValue(): HTMLElement | null {
    return document.getElementById("maxPlayersValue");
  }

  getGames(): any[] {
    return Array.from(this.games.values());
  }
}
