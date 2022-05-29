import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../../models/users/user'
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url='http://localhost:3000'
  constructor(private http: HttpClient) { }
  getUsers(): Observable<any> {
    return this.http.get(`${this.url}/Users/get`);
  }

  searchUser(id: string): Observable<any> {
    
    //this.http.get(`${this.url}/Users/search/${id}`).subscribe(data => console.log(data));
    
    return this.http.get(`${this.url}/Users/search/${id}`);
  }

  addClass(id: string, idValue: string) {
    return this.http.get(`${this.url}/Users/addClass/${id}/${idValue}`)
  }

  addUsers (User: Users) {
    return this.http.post(`${this.url}/Users/add/`, User);
  }

  deleteUsers(id: string): Observable<any> {
    return this.http.delete(`${this.url}/Users/delete/${id}`)
  }
}
