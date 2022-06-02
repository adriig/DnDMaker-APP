import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Posts } from 'src/app/models/posts/posts';
import { Comments } from 'src/app/models/posts/comments';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  url='http://localhost:3000'
  constructor(private http: HttpClient) { }
  getPosts(): Observable<any> {
    return this.http.get(`${this.url}/Posts/get`);
  }

  searchPost(id: number): Observable<any> {
    return this.http.get(`${this.url}/Posts/search/${id}`);
  }

  getMyPosts(idOwner: string): Observable<any> {
    return this.http.get(`${this.url}/Posts/getmy/${idOwner}`);
  }

  addPost (Posts: Posts) {
    return this.http.post(`${this.url}/Posts/add/`, Posts);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.url}/Posts/delete/${id}`)
  }

  getPostByType(type: string): Observable<any> {
    return this.http.get(`${this.url}/Posts/getpertype/${type}`)
  }

  addComment(id: number, comentario: Comments): Observable<any> {
    return this.http.put(`${this.url}/Posts/addComment/${id}`, comentario)
  }

  react(id: number, reaction: Boolean): Observable<any> {
    return this.http.get(`${this.url}/Posts/reaction/${id}/${reaction}`)
  }
}
