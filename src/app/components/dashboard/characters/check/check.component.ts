import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from 'src/app/services/characterService/characters.service';
import { Location } from "@angular/common";
import { Personaje } from '../../../../../../src/app/models/character/character'

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  MiCharacter: any
  backgroundImg: any
  constructor(private _characterService: CharactersService, private route: ActivatedRoute, private location: Location) {
    this.backgroundImg = ('url(../../../../../assets/files/characters.jpg)');
   }

  ngOnInit(): void {
    this.obtenerCharacter();
  }

  obtenerCharacter() {
    const id = this.route.snapshot.paramMap.get("id");
    console.log("Id del coso:"+id)
    if(id!=null) {
     this._characterService.searchCharacter(id).subscribe(data => {
       console.log(data);
       this.MiCharacter = new Personaje(data._id, data._NombrePersonaje, data._Alineacion, data._Lore, data._IdOwner, data._Personalidad, data._Raza, data._Clase, data._Hechizos, data._Hechizos, data._Habilidades, data._ImagePath);
     })
  }
}

}
