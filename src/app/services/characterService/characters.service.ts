import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personaje } from '../../models/character/character'
@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  url='http://localhost:3000'
  constructor(private http: HttpClient) { }
  getCharacters(): Observable<any> {
    return this.http.get(`${this.url}/characters/get`);
  }

  searchCharacter(id: number): Observable<any> {
    return this.http.get(`${this.url}/characters/search/${id}`);
  }

  getMyCharacters(idOwner: number): Observable<any> {
    return this.http.get(`${this.url}/characters/getmy/${idOwner}`);
  }

  addCharacter (Character: Personaje) {
    console.log(Character)
    return this.http.post(`${this.url}/characters/add/`, Character);
  }
}
