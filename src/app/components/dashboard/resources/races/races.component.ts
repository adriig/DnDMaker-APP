import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router  } from '@angular/router';
import { Personaje } from 'src/app/models/character/character'
import { Raza } from 'src/app/models/races/races'
import { MatTableDataSource } from '@angular/material/table';
import { ClassesServiceService } from 'src/app/services/classesService/classes-service.service'
import { RacesServiceService } from 'src/app/services/racesService/races-service.service';
import { Users } from 'src/app/models/users/user';
import { UsersService } from 'src/app/services/userService/users.service';
@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {
  listRaces: Raza[] = [];
  listMyRaces: Raza[] = [];
  users: Map<string, Users> = new Map<string, Users>();
  statusRaces: Map<number, Boolean> = new Map<number, Boolean>();
  profileId: string = "none"
  Mypages: number = 1;
  pages: number = 1;  

  constructor(public auth: AuthService, private userService: UsersService, private _racesService: RacesServiceService, private _changeDetectorRefs: ChangeDetectorRef, private _router: Router) { }

  ngOnInit(): void {
    let userId : string;
    this.auth.user$
    .subscribe((profile) => {

    if(profile?.sub!==undefined) {
      userId=profile.sub
      this.profileId=userId
    }
    this._racesService.getRaces().subscribe(data => {
      this.listRaces=data
    })

    if(profile?.sub!==undefined) {
      userId=profile.sub
    }
    this._racesService.getmyRace(userId).subscribe(data2 => {
      this.listMyRaces=data2
    })
  });

    

    // this._characterService.getMyCharacters().subscribe(data => {
    //   this.listMyCharacters=data,
    //   this.dataSource = new MatTableDataSource (this.listMyCharacters);
    // })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  deleteRaces(id: number) {
    if (confirm('Are you sure you want to delete this character?')) {
      this._racesService.deleteRaces(id). subscribe(data => {
        console.log(data);
        this.ngOnInit();
      },
        error => console.log(error));
    }
  }

  resolveUsername(id: string) {
    return this.users.get(id)?._Nombre;
  }

  debugTest() {
    console.log(this.statusRaces)
  }

  checkOwner(id: string) {      
       return this.profileId==id
  }

  checkRaces(valueId: number) {
    return this.statusRaces.get(valueId);
  }

  removeRaceInUser(id: number) {
    this.auth.user$
    .subscribe((profile) => {


    if(profile?.sub!==undefined) {
      let asd= this.userService.deleteRace(profile.sub, id)
      asd.subscribe(data => {
        console.log(data)
      })
    }
    this.ngOnInit();
  });
  }

  addRaceToUser(id: number) {
    this.auth.user$
    .subscribe((profile) => {


    if(profile?.sub!==undefined) {
      let asd= this.userService.addRaces(profile.sub, id)
      asd.subscribe(data => {
        console.log(data)
      })
    }
    this.ngOnInit();
  });
  }

}
