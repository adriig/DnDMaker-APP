import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mapTo, Observable } from 'rxjs';
import { Users } from '../../models/users/user'
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //url='http://localhost:3000'
  url=' https://pruebaapioni.herokuapp.com'
  constructor(private http: HttpClient) { }
  getUsers(): Observable<any> {
    return this.http.get(`${this.url}/Users/get`);
  }

  searchUser(id: string): Observable<any> {
    
    //this.http.get(`${this.url}/Users/search/${id}`).subscribe(data => console.log(data));
    
    return this.http.get(`${this.url}/Users/search/${id}`);
  }

  deleteClass(id: string, idValue: number) {
    return this.http.get(`${this.url}/Users/deleteClassInUser/${id}/${idValue}`)
  }

  addClass(id: string, idValue: number) {
    var map = new Map();
    return this.http.put(`${this.url}/Users/addClass/${id}/${idValue}`, map)
  }

  checkIfClassExists(id: string, idValue: number) {
    return this.http.get(`${this.url}/Users/existClassInUsers/${id}/${idValue}`)
  }

  addUsers (User: Users) {
    return this.http.post(`${this.url}/Users/add/`, User);
  }

  deleteUsers(id: string): Observable<any> {
    return this.http.delete(`${this.url}/Users/delete/${id}`)
  }

  getClassesOfUser(id: string): Observable<any> {
    return this.http.get(`${this.url}/Users/getClasses/${id}`)
  }

  deleteRace(id: string, idValue: number) {
    return this.http.get(`${this.url}/Users/deleteRaceInUser/${id}/${idValue}`)
  }

  addRaces(id: string, idValue: number) {
    var map = new Map();
    return this.http.put(`${this.url}/Users/addRaces/${id}/${idValue}`, map)
  }

  checkIfRacesExists(id: string, idValue: number) {
    return this.http.get(`${this.url}/Users/existRaceInUser/${id}/${idValue}`)
  }

  getRacesOfUser(id: string): Observable<any> {
    return this.http.get(`${this.url}/Users/getRaces/${id}`)
  }
}
