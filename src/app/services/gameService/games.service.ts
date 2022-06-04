import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game/game';
import { GameRequest } from 'src/app/models/game/gameRequest';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  url = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getGames(): Observable<any> {
    console.log("Hola")
    return this.http.get(`${this.url}/games/get/`);
  }

  getGame(id: number): Observable<any> {
    return this.http.get(`${this.url}/games/get/${id}`);
  }

  getGamesFrom(ownerId: string): Observable<any> {
    return this.http.get(`${this.url}/games/from/${ownerId}`);
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
}
