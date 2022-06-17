import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game/game';
import { GameRequest } from 'src/app/models/game/gameRequest';
import { GameInvite } from 'src/app/models/game/gameInvite';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  //url = 'http://localhost:3000'
  url=' https://pruebaapioni.herokuapp.com'

  constructor(private http: HttpClient) { }

  getGames(): Observable<any> {
    return this.http.get(`${this.url}/games/get/`);
  }

  getGame(gameId: string): Observable<any> {
    return this.http.get(`${this.url}/games/get/${gameId}`);
  }

  getGamesFrom(ownerId: string): Observable<any> {
    return this.http.get(`${this.url}/games/from/${ownerId}`);
  }

  addParticipant(gameId: string, playerId: string): Observable<any> {
    return this.http.put(`${this.url}/games/participant/add`, { gameId, playerId });
  }

  deleteParticipant(gameId: string, playerId: string): Observable<any> {
    return this.http.put(`${this.url}/games/participant/delete`, { gameId, playerId });
  }

  createGame(game: Game): Observable<any> {
    return this.http.post(`${this.url}/games/create/`, game);
  }

  deleteGame(gameId: string): Observable<any> {
    return this.http.delete(`${this.url}/games/delete/${gameId}`);
  }

  createGameRequest(request: GameRequest): Observable<any> {
    return this.http.post(`${this.url}/games/request/create`, request);
  }

  getGameRequestsFromOwner(ownerId: string): Observable<any> {
    return this.http.get(`${this.url}/games/request/from/${ownerId}`);
  }

  getGameRequestFromOwnerInGame(ownerId: string, gameId: string): Observable<any> {
    return this.http.get(`${this.url}/games/request/from/${ownerId}/${gameId}`);
  }

  getGameRequestsFromGame(gameId: string): Observable<any> {
    return this.http.get(`${this.url}/games/request/get/${gameId}`);
  }

  deleteGameRequestFromPlayerInGame(ownerId: string, gameId: string): Observable<any> {
    return this.http.delete(`${this.url}/games/request/delete/${ownerId}/${gameId}`);
  }

  deleteGameRequestFromGame(gameId: string): Observable<any> {
    return this.http.delete(`${this.url}/games/request/delete/game/${gameId}`);
  }

  createInvite(invite: GameInvite): Observable<any> {
    return this.http.post(`${this.url}/games/invite/create`, invite);
  }

  deleteInvitesFromGame(gameId: string): Observable<any> {
    return this.http.delete(`${this.url}/games/invite/delete/game/${gameId}`);
  }

  deleteInvite(inviteId: string): Observable<any> {
    return this.http.delete(`${this.url}/games/invite/delete/${inviteId}`);
  }

  getInvitesFromInvited(invitedId: string): Observable<any> {
    return this.http.get(`${this.url}/games/invite/get/invited/${invitedId}`);
  }

  getInvitesFromGame(gameId: string): Observable<any> {
    return this.http.get(`${this.url}/games/invite/get/game/${gameId}`);
  }
}
