import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Raza } from '../../models/races/races'
@Injectable({
  providedIn: 'root'
})
export class RacesServiceService {
  url='http://localhost:3000'
  constructor(private http: HttpClient) { }
  getRaces(): Observable<any> {
    return this.http.get(`${this.url}/Razas/get`);
  }

  searchRace(id: number): Observable<any> {
    return this.http.get(`${this.url}/Razas/search/${id}`);
  }

  getmyRace(idOwner: string): Observable<any> {
    return this.http.get(`${this.url}/Razas/getmy/${idOwner}`);
  }

  addRaces (Race: Raza) {
    return this.http.post(`${this.url}/Razas/add/`, Race);
  }

  deleteRaces(id: number): Observable<any> {
    return this.http.delete(`${this.url}/Razas/delete/${id}`)
  }
}
