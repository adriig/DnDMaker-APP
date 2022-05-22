import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router  } from '@angular/router';
import { Personaje } from 'src/app/models/character/character'
import { Clase } from 'src/app/models/classes/class'
import { MatTableDataSource } from '@angular/material/table';
import { ClassesServiceService } from 'src/app/services/classesService/classes-service.service'
@Component({
   selector: 'app-classes',
   templateUrl: './classes.component.html',
   styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  listClasses: Clase[] = [];
  listMyClasses: Clase[] = [];
  displayedColumns = ['Nombre', 'Descripcion', 'Metodos'];
  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;
  

  constructor(public auth: AuthService, private _classService: ClassesServiceService, private _changeDetectorRefs: ChangeDetectorRef, private _router: Router) { }

  ngOnInit(): void {
    let userId : string;
    this.auth.user$
    .subscribe((profile) => {

    this._classService.getClasses().subscribe(data => {
      this.listClasses=data,
      this.dataSource = new MatTableDataSource (this.listClasses);
    })

    if(profile?.sub!==undefined) {
      userId=profile.sub
    }
    console.log(userId)
    this._classService.getMyClasses(userId).subscribe(data2 => {
      this.listMyClasses=data2,
      this.dataSource2 = new MatTableDataSource (this.listMyClasses);
    })
  });

    

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

  deleteClasses(id: number) {
    if (confirm('Are you sure you want to delete this character?')) {
      this._classService.deleteClass(id). subscribe(data => {
        console.log(data);
        this.ngOnInit();
      },
        error => console.log(error));
    }
  }

}
