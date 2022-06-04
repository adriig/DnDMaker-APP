import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { PostsService } from 'src/app/services/posts/posts.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Posts } from 'src/app/models/posts/posts';
import { v4 as uuidv4 } from 'uuid';
import { Users } from 'src/app/models/users/user';
import { UsersService } from 'src/app/services/userService/users.service';

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
    })

    this.auth.user$.subscribe((profile) => {
      if (profile?.sub !== undefined) {
        this.profileId = profile.sub
      }
    });

    this.userService.getUsers().subscribe(data => {
      for (const key in data) {
        const user : Users = data[key];
        this.postOwners.set(user._id, user);
      }
    })
  }

  createPost(): void {
    console.log(this.postForm.get('tipo')?.value)
    const Post = new Posts(uuidv4(), this.postForm.get('titulo')?.value, this.postForm.get('texto')?.value, 0, 0, new Date(), this.postForm.get('tipo')?.value, this.profileId, [])
    this.postService.addPost(Post).subscribe(data => {
    });
    
    this.ngOnInit()
  }

  resolveUsername(id: string) {
    return this.postOwners.get(id)?._Nombre;
  }

  stringAsDate(dateStr: string) {
    return new Date(dateStr);
  }

}
