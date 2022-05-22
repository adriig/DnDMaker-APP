import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clase } from 'src/app/models/classes/class'
@Injectable({
  providedIn: 'root'
})
export class ClassesServiceService {
  url='http://localhost:3000'
  constructor(private http: HttpClient) { }
  getClasses(): Observable<any> {
    return this.http.get(`${this.url}/Classes/get`);
  }

  searchClass(id: number): Observable<any> {
    return this.http.get(`${this.url}/Classes/search/${id}`);
  }

  getMyClasses(idOwner: string): Observable<any> {
    console.log(this.http.get(`${this.url}/Classes/getmy/${idOwner}`))
    return this.http.get(`${this.url}/Classes/getmy/${idOwner}`);
  }

  addClass (Class: Clase) {
    console.log("clase: "+Class)
    return this.http.post(`${this.url}/Classes/add/`, Class);
  }

  deleteClass(id: number): Observable<any> {
    return this.http.delete(`${this.url}/Classes/delete/${id}`)
  }
}

