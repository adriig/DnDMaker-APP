import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from 'src/app/services/characterService/characters.service';
import { Location } from "@angular/common";
import {RacesServiceService  } from '../../../../../services/racesService/races-service.service'
import { Raza } from 'src/app/models/races/races';

@Component({
  selector: 'app-check-races',
  templateUrl: './check-races.component.html',
  styleUrls: ['./check-races.component.css']
})
export class CheckRacesComponent implements OnInit {
  MiRaza: any
  backgroundImg: any
  constructor(private _racesService: RacesServiceService, private route: ActivatedRoute, private location: Location) {
    this.backgroundImg = ('url(../../../../../assets/files/characters.jpg)');
   }

  ngOnInit(): void {
    this.obtenerRaza();
  }

  obtenerRaza() {
    const id = this.route.snapshot.paramMap.get("id");
    console.log("Id del coso:"+id)
    if(id!=null) {
     this._racesService.searchRace(parseInt(id)).subscribe(data => {
       console.log(data);
       this.MiRaza = new Raza(data._id, data._NombreRaza, data._Multiplicadores, data._Habilidades, data._Origen, data._Nombres, data._IdOwner);
     })
  }
}

}
