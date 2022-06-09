import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Images } from 'src/app/models/images/image';
@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  url='http://localhost:3000'
  constructor(private http: HttpClient) { }

  public get(id:string){
    return this.http.get(`${this.url}/pictures/get/${id}`);
  }

  public post(id: any, file: any){
    const imagen = new Images(id, file)
    console.log(imagen.imagePath)
    return this.http.post(`${this.url}/pictures/post/`, imagen);
  }
}
