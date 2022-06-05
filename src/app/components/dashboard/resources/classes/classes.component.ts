import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router  } from '@angular/router';
import { Personaje } from 'src/app/models/character/character'
import { Clase } from 'src/app/models/classes/class'
import { Users } from 'src/app/models/users/user'
import { MatTableDataSource } from '@angular/material/table';
import { ClassesServiceService } from 'src/app/services/classesService/classes-service.service'
import { UsersService } from 'src/app/services/userService/users.service';
@Component({
   selector: 'app-classes',
   templateUrl: './classes.component.html',
   styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  listClasses: Clase[] = [];
  listMyClasses: Clase[] = [];
  users: Map<string, Users> = new Map<string, Users>();
  statusClass: Map<number, Boolean> = new Map<number, Boolean>();
  profileId: string = "none"
  Mypages: number = 1;
  pages: number = 1;

  constructor(public auth: AuthService, private userService: UsersService, private _classService: ClassesServiceService, private _changeDetectorRefs: ChangeDetectorRef, private _router: Router) { }

  ngOnInit(): void {
    let userId : string;
    this.auth.user$
    .subscribe((profile) => {
    if(profile?.sub!==undefined) {
      userId=profile.sub
      this.profileId=userId
    }
    this._classService.getClasses().subscribe(data => {
      this.listClasses=data
      for (const key in this.listClasses) {
        this.userService.checkIfClassExists(userId, this.listClasses[key]._id).subscribe(data => {
          this.statusClass.set(this.listClasses[key]._id, Boolean(data));
          })
        }
      })
     
    this._classService.getMyClasses(userId).subscribe(data2 => {
      this.listMyClasses=data2
    })
  });

  this.userService.getUsers().subscribe(data => {
    for (const key in data) {
      const user : Users = data[key];
      this.users.set(user._id, user);
    }
  })

    

    // this._characterService.getMyCharacters().subscribe(data => {
    //   this.listMyCharacters=data,
    //   this.dataSource = new MatTableDataSource (this.listMyCharacters);
    // })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  deleteClasses(id: number) {
    if (confirm('Are you sure you want to delete this character?')) {
      this._classService.deleteClass(id). subscribe(data => {
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
    console.log(this.statusClass)
  }

  checkOwner(id: string) {      
       return this.profileId==id
  }

  checkClass(valueId: number) {
    return this.statusClass.get(valueId);
  }

  removeClassInUser(id: number) {
    this.auth.user$
    .subscribe((profile) => {


    if(profile?.sub!==undefined) {
      let asd= this.userService.deleteClass(profile.sub, id)
      asd.subscribe(data => {
        console.log(data)
      })
    }
    this.ngOnInit();
  });
  }

  addClassToUser(id: number) {
    this.auth.user$
    .subscribe((profile) => {


    if(profile?.sub!==undefined) {
      let asd= this.userService.addClass(profile.sub, id)
      asd.subscribe(data => {
        console.log(data)
      })
    }
    this.ngOnInit();
  });
  }
}
