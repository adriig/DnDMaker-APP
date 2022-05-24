import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { UsersService } from 'src/app/services/userService/users.service'
import { Users } from 'src/app/models/users/user'
@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit {

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    private userService : UsersService,
  ) { }

  ngOnInit(): void {
    let userId : string;
    let exist: any;
    this.auth.user$.subscribe((profile) => {
    if(profile?.sub!==undefined) {
     userId=profile.sub
    }
    this.userService.searchUser(userId).subscribe(data2 => {
      if(data2==null) {
        const newUser = new Users(userId, [], [])
        this.userService.addUsers(newUser).subscribe()
      }
    })
  });
  }

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

}