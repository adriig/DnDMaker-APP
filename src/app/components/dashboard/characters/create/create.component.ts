import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Personaje } from 'src/app/models/character/character'
import { CharactersService } from 'src/app/services/characterService/characters.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})


export class CreateComponent implements OnInit {
  titulo = 'Creating character'
  characterForm: FormGroup;
  id: number;
  constructor(private fb: FormBuilder, private aRouter: ActivatedRoute, private characterService: CharactersService) {
    this.characterForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      alineacion: ['', Validators.required],
      Lore: ['', Validators.required],
      IdOwner: ['', Validators.required],
      Personalidad: ['', Validators.required],
      Raza: ['', Validators.required],
      Clase: ['', Validators.required],
      Hechizos: ['', Validators.required],
      Estadisticas: ['', Validators.required],
      Habilidades: ['', Validators.required],
    })
    this.id = 534534
  }

  ngOnInit(): void {
  }

  crearCharacter()  {
    if(this.characterForm.get('id')?.value !== undefined && this.characterForm.get('nombre')?.value !== undefined && this.characterForm.get('alineacion')?.value !== undefined && this.characterForm.get('Lore')?.value !== undefined, this.characterForm.get('IdOwner')?.value !== undefined, this.characterForm.get('Personalidad')?.value!==undefined, this.characterForm.get('Raza')?.value!==undefined, this.characterForm.get('Clase')?.value!==undefined, this.characterForm.get('Hechizos')?.value!==undefined, this.characterForm.get('Estadisticas')?.value!==undefined, this.characterForm.get('Habilidades')?.value!==undefined ) {
    const Character = new Personaje (this.characterForm.get('id')?.value, this.characterForm.get('nombre')?.value, this.characterForm.get('alineacion')?.value, this.characterForm.get('Lore')?.value, this.characterForm.get('IdOwner')?.value, this.characterForm.get('Personalidad')?.value, this.characterForm.get('Raza')?.value, this.characterForm.get('Clase')?.value, this.characterForm.get('Hechizos')?.value, this.characterForm.get('Estadisticas')?.value, this.characterForm.get('Habilidades')?.value )
    this.characterService.addCharacter(Character).subscribe()
    this.characterForm.reset()
    }
  }

}
