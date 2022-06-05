import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { PostsService } from 'src/app/services/posts/posts.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Posts } from 'src/app/models/posts/posts';
import { v4 as uuidv4 } from 'uuid';
import { Users } from 'src/app/models/users/user';
import { UsersService } from 'src/app/services/userService/users.service';
import { Comments } from 'src/app/models/posts/comments';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  posts: any;
  profileId: string = "none";
  postForm: FormGroup;
  postOwners: Map<string, Users> = new Map<string, Users>();
  postReaction: Map<string, Number> = new Map<string, Number>();
  pages: number = 1;

  constructor(private formBuilder: FormBuilder, private postService: PostsService, public auth: AuthService, private userService: UsersService) {
    this.postForm = formBuilder.group({
      titulo: ['', Validators.required],
      texto: ['', Validators.required],
      tipo: ['', Validators.required],
    });
   }

  ngOnInit(): void {
    this.postForm.reset()

    this.postService.getPosts().subscribe(data => {
      this.posts = data;
      this.auth.user$.subscribe((profile) => {
        if (profile?.sub !== undefined) {
          this.profileId = profile.sub
        }
      this.posts.forEach((data: { _id: string; _Titulo: string; _Texto: string; _Likes: string[]; _Dislikes: string[]; _Date: Date; _Tipo: string; _IdOwner: string; _Comentarios: Comments[]; }) => {
          const post = new Posts(data._id, data._Titulo, data._Texto, data._Likes, data._Dislikes, data._Date, data._Tipo, data._IdOwner, data._Comentarios)
          console.log(post)
          let feedback=post.existReaction(this.profileId)
          this.postReaction.set(data._id, feedback);
      });
      
    });
    })

    this.userService.getUsers().subscribe(data => {
      for (const key in data) {
        const user : Users = data[key];
        this.postOwners.set(user._id, user);
      }
    })

  }

  createPost(): void {
    console.log(this.postForm.get('tipo')?.value)
    const Post = new Posts(uuidv4(), this.postForm.get('titulo')?.value, this.postForm.get('texto')?.value, [], [], new Date(), this.postForm.get('tipo')?.value, this.profileId, [])
    this.postService.addPost(Post).subscribe(data => {
    });
    
    this.ngOnInit()
  }

  resolveUsername(id: string) {
    return this.postOwners.get(id)?._Nombre;
  }

  resolveReaction(id: string) {
    return this.postReaction.get(id)
  }

  stringAsDate(dateStr: string) {
    return new Date(dateStr);
  }

  unLike(id: string) {
    this.postService.unlike(id, this.profileId).subscribe(data => {
    });

    this.posts.forEach((element: { _id: string, _Likes: Array<string>, _Dislikes: Array<string> }) => {
      if(element._id==id) {
        element._Likes.pop()
      }
    });

    this.postReaction.set(id, 0);
  }

  unDislike(id: string) {
    this.postService.undislike(id, this.profileId).subscribe(data => {
    });

    this.posts.forEach((element: { _id: string, _Likes: Array<string>, _Dislikes: Array<string> }) => {
      if(element._id==id) {
        element._Dislikes.pop()
      }
    });

    this.postReaction.set(id, 0);
  }

  like(id: string) {
    if(this.resolveReaction(id)==-1) {
      this.unDislike(id)
    }
    this.postService.like(id, this.profileId).subscribe(data => {
    });
    this.posts.forEach((element: { _id: string, _Likes: Array<string> }) => {
      if(element._id==id) {
        element._Likes.push("")
      }
    });
    this.postReaction.set(id, 1);
  }

  dislike(id: string) {
    if(this.resolveReaction(id)==1) {
      this.unLike(id)
    }
    this.postService.dislike(id, this.profileId).subscribe(data => {
    });
    this.posts.forEach((element: { _id: string, _Likes: Array<string>, _Dislikes: Array<string> }) => {
      if(element._id==id) {
        element._Dislikes.push("")
      }
    });
    this.postReaction.set(id, -1);
  }

  filterByType(tipo: string) : void {
    this.postService.getPostByType(tipo).subscribe(data => {
      this.posts = data;
    })
  }
  
  filterByOwner() {
    this.postService.getMyPosts(this.profileId).subscribe(data => {
      this.posts = data;
    })
  }
}
