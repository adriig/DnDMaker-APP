import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personaje } from '../../models/character/character'
@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  url='http://localhost:3000/Characters/get/'
  constructor(private http: HttpClient) { }
  getCharacters(): Observable<any> {
    return this.http.get(`${this.url}/characters/get`);
  }
}
