import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personaje } from '../../models/character/character'
@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  url=''
  constructor(private http: HttpClient) { }
  getCharacters(): Observable<any> {
    return this.http.get(`${this.url}/get`);
  }
}
