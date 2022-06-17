import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personaje } from '../../models/character/character'
@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  //url='http://localhost:3000'
  url=' https://pruebaapioni.herokuapp.com'
  constructor(private http: HttpClient) { }
  getCharacters(): Observable<any> {
    return this.http.get(`${this.url}/characters/get`);
  }

  searchCharacter(id: string): Observable<any> {
    return this.http.get(`${this.url}/characters/search/${id}`);
  }

  getMyCharacters(idOwner: string): Observable<any> {
    console.log(this.http.get(`${this.url}/characters/getmy/${idOwner}`))
    return this.http.get(`${this.url}/characters/getmy/${idOwner}`);
  }

  addCharacter (Character: Personaje) {
    return this.http.post(`${this.url}/characters/add/`, Character);
  }

  deleteCharacter(id: string): Observable<any> {
    return this.http.delete(`${this.url}/characters/delete/${id}`)
  }
}
