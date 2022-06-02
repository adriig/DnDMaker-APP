import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Game } from 'src/app/models/game/game';
import { GamesService } from 'src/app/services/gameService/games.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  maxPlayers!: HTMLInputElement;
  maxPlayersValue!: HTMLElement | null;

  gameForm: FormGroup;

  games: any;
  profileId: string = "none";

  constructor(private formBuilder: FormBuilder, public auth: AuthService, private gameService: GamesService) {
    this.gameForm = formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.maxPlayers = <HTMLInputElement>document.getElementById("maxPlayers")
    this.maxPlayersValue = document.getElementById("maxPlayersValue")

    // TODO: remove
    this.gameService.getGames()
      .subscribe(data => {
        this.games = data;
      })

    this.auth.user$.subscribe((profile) => {
      if (profile?.sub == undefined) {
        return;
      }

      this.profileId = profile.sub
      // this.gameService.getGamesFrom(this.profileId)
      //   .subscribe(data => {
      //     this.games = data;
      //   })
    });
  }

  createGame(): void {
    const game = new Game(
      uuidv4(),
      this.gameForm.get('name')?.value,
      this.profileId,
      Number.parseInt(this.maxPlayers.value),
      new Date(),
      [this.profileId] // agregamos al creador del juego
    );

    this.maxPlayers.value = "8";
    this.gameService.createGame(game).subscribe(data => {
      console.log("COMPLETED");
      
    });
    console.log("ASD");
    

    this.reset()
    this.ngOnInit()
  }

  deleteGame(gameId: string): void {
    this.gameService.deleteGame(gameId).subscribe();
    this.ngOnInit()
  }
  
  reset(): void {
    this.maxPlayers.value = "8";
    this.slider();
    this.gameForm.reset();
  }

  slider(): void {
    if (this.maxPlayersValue != null && this.maxPlayers != null) {
      this.maxPlayersValue.innerHTML = this.maxPlayers.value
    }
  }
}
