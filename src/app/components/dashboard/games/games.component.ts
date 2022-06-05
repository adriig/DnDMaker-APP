import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game/game';
import { GameInvite } from 'src/app/models/game/gameInvite';
import { GameRequest } from 'src/app/models/game/gameRequest';
import { GamesService } from 'src/app/services/gameService/games.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Game[] = [];
  invites: GameInvite[] = [];

  playerGames: any = [];
  totalPlayerGames: number = 0;

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
        this.gameService.getGamesFrom(this.profileId)
          .subscribe(data => {
            this.totalPlayerGames = data.length - (Math.min(3, data.length))
            this.playerGames = data.slice(0, 3);
          })
        this.gameService.getInvitesFromInvited(this.profileId).subscribe(data => {
          this.invites = data;
        })
      }
    });
  }
  

  createGameRequest(game: Game): void {
    if (this.existsParticipant(game)) {
      return
    }

    const request = new GameRequest(
      uuidv4(),
      this.profileId,
      game._id,
      new Date()
    )

    this.requests.add(game._id)
    this.gameService.createGameRequest(request).subscribe();
  }

  acceptInvite(invite: GameInvite) {
    this.declineInvite(invite);
    for (const game of this.games) {
      if(game._id == invite.gameId) {
        game.participants.push(invite.invited)
      }
    }
    this.gameService.addParticipant(invite.gameId, invite.invited).subscribe()

    if (this.requests.has(invite.gameId)) {
      this.cancelGameRequest(invite.gameId)
    }
  }

  declineInvite(invite: GameInvite) {
    for (let i = 0; i < this.invites.length; i++) {
      const invite = this.invites[i];
      if (invite == invite) {
        this.invites.splice(i, 1)
      }
    }

    this.gameService.deleteInvite(invite._id).subscribe()
  }

  leaveGame(game: Game) {
    game.participants.splice(game.participants.indexOf(this.profileId), 1);
    this.gameService.deleteParticipant(game._id, this.profileId).subscribe();
  }

  existsParticipant(game: Game): boolean {
    for (const participant of game.participants) {
      if (participant == this.profileId) {
        return true;
      }
    }
    return false;
  }

  isOwner(game: Game, userId: string): boolean {
    return game.owner == userId;
  }

  cancelGameRequest(gameId: string): void {
    this.requests.delete(gameId)
    this.gameService.deleteGameRequestFromPlayerInGame(this.profileId, gameId).subscribe();
  }

  hasPlayerRequestedJoinGame(gameId: string): boolean {
    return this.requests.has(gameId);
  }
}
