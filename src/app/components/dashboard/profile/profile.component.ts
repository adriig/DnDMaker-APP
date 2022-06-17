import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Users } from 'src/app/models/users/user';
import { UsersService } from 'src/app/services/userService/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  myUser: Users[] = [];
  public profileJson: string = "";
  profileId: string = "none";
  constructor(public auth: AuthService, private userService: UsersService) {

  }

  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      let userId: string
      if(profile?.sub !== undefined) {
        userId = profile.sub
        this.profileId = profile.sub
      } else {
        userId = "1020202"
      }
      this.profileJson = JSON.stringify(profile, null, 2)
      console.log("UserId: "+userId) 
      this.userService.searchUser(userId).subscribe(data2 => {
        for(var i=0; i<data2.length; i++) {
          console.log(i)
        }
        console.log("first: "+this.myUser)
    });
  
  })
  console.log("second: "+this.myUser)
  }
}