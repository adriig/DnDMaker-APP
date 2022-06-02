import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { GameRequest } from 'src/app/models/game/gameRequest';
import { GamesService } from 'src/app/services/gameService/games.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: any;
  profileId: string = "none";
  requests: Set<string> = new Set<string>();

  constructor(private gameService: GamesService, public auth: AuthService) {
  }

  ngOnInit(): void {
    this.requests.clear();

    this.gameService.getGames().subscribe(data => {
      this.games = data;
    })

    this.auth.user$.subscribe((profile) => {
      if (profile?.sub !== undefined) {
        this.profileId = profile.sub
        this.gameService.getGameRequestsFromOwner(this.profileId)
          .subscribe(data => {
            for (const request of data) {
              this.requests.add(request.gameId)
            }
          })
      }
    });
  }

  createGameRequest(gameId: string): void {
    const request = new GameRequest(
      uuidv4(),
      this.profileId,
      gameId,
      new Date()
    )

    this.requests.add(gameId)
    this.gameService.createGameRequest(request).subscribe();
  }

  cancelGameRequest(gameId: string): void {
    this.requests.delete(gameId)
    this.gameService.deleteGameRequestFromPlayerInGame(this.profileId, gameId).subscribe();
  }

  hasPlayerRequestedJoinGame(gameId: string): boolean {
    return this.requests.has(gameId);
  }
}
