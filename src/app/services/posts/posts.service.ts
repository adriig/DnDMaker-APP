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

  searchPost(id: string): Observable<any> {
    return this.http.get(`${this.url}/Posts/search/${id}`);
  }

  getMyPosts(idOwner: string): Observable<any> {
    return this.http.get(`${this.url}/Posts/getmy/${idOwner}`);
  }

  addPost (Posts: Posts) {
    return this.http.post(`${this.url}/Posts/add/`, Posts);
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(`${this.url}/Posts/delete/${id}`)
  }

  getPostByType(type: string): Observable<any> {
    return this.http.get(`${this.url}/Posts/getpertype/${type}`)
  }

  addComment(id: string, comentario: Comments): Observable<any> {
    return this.http.put(`${this.url}/Posts/addComment/${id}`, comentario)
  }

  like(id: string, idOwner: string): Observable<any> {
    return this.http.get(`${this.url}/Posts/like/${id}/${idOwner}`)
  }

  dislike(id: string, idOwner: string): Observable<any> {
    return this.http.get(`${this.url}/Posts/dislike/${id}/${idOwner}`)
  }

  unlike(id: string, idOwner: string): Observable<any> {
    return this.http.get(`${this.url}/Posts/unlike/${id}/${idOwner}`)
  }

  undislike(id: string, idOwner: string): Observable<any> {
    return this.http.get(`${this.url}/Posts/undislike/${id}/${idOwner}`)
  }
}
