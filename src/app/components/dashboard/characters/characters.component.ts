import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router  } from '@angular/router';
import { Personaje } from 'src/app/models/character/character'
import { CharactersService } from 'src/app/services/characterService/characters.service'
import { MatTableDataSource } from '@angular/material/table';
import { Users } from 'src/app/models/users/user'
import{ UsersService } from 'src/app/services/userService/users.service'
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  listCharaceters: Personaje[] = [];
  listMyCharacters: Personaje[] = [];
  displayedColumns = ['Nombre', 'Raza', 'Clase', 'Owner', 'Metodos'];
  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;
  users: Map<string, Users> = new Map<string, Users>();

  constructor(public auth: AuthService, private userService: UsersService, private _characterService: CharactersService, private _changeDetectorRefs: ChangeDetectorRef, private _router: Router) { }

  ngOnInit(): void {
    let userId : string;
    this.auth.user$
    .subscribe((profile) => {
      this._characterService.getCharacters().subscribe(data => {
        this.listCharaceters=data,
        this.dataSource = new MatTableDataSource (this.listCharaceters);
      })

      if(profile?.sub!==undefined) {
        userId=profile.sub
      }
      this._characterService.getMyCharacters(userId).subscribe(data2 => {
        this.listMyCharacters=data2,
        this.dataSource2 = new MatTableDataSource (this.listMyCharacters);
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
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  deleteCharacter(id: number) {
    if (confirm('Are you sure you want to delete this character?')) {
      this._characterService.deleteCharacter(id). subscribe(data => {
        console.log(data);
        this.ngOnInit();
      },
        error => console.log(error));
    }
  }

  resolveUsername(id: string) {
    return this.users.get(id)?._Nombre;
  }

}
