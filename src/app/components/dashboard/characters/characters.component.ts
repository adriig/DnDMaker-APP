import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router  } from '@angular/router';
import { Personaje } from 'src/app/models/character/character'
import { CharactersService } from 'src/app/services/characterService/characters.service'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  listCharaceters: Personaje[] = [];
  listMyCharacters: Personaje[] = [];
  displayedColumns = ['Nombre', 'Raza', 'Clase', 'Metodos'];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public auth: AuthService, private _characterService: CharactersService, private _changeDetectorRefs: ChangeDetectorRef, private _router: Router) { }

  ngOnInit(): void {
    this._characterService.getCharacters().subscribe(data => {
      this.listCharaceters=data,
      this.dataSource = new MatTableDataSource (this.listCharaceters);
    })

    // this._characterService.getMyCharacters().subscribe(data => {
    //   this.listMyCharacters=data,
    //   this.dataSource = new MatTableDataSource (this.listMyCharacters);
    // })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
