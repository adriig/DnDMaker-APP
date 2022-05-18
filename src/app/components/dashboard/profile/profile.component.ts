import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileJson: string = "";
  constructor(public auth: AuthService) {

  }

  ngOnInit(): void {
    this.auth.user$
    .subscribe((profile) => {
      this.profileJson = JSON.stringify(profile, null, 2)
      console.log(profile?.sub)
    });
    console.log(this.auth.getUser())
  }

}