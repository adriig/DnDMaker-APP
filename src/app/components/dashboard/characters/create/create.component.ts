import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Personaje } from 'src/app/models/character/character';
import { CharactersService } from 'src/app/services/characterService/characters.service';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})


export class CreateComponent implements OnInit {
  titulo = 'Creating character'
  characterForm: FormGroup;
  id: number;
  constructor(private fb: FormBuilder, private aRouter: ActivatedRoute, private characterService: CharactersService, public auth: AuthService) {
    this.characterForm = this.fb.group({
      nombre: ['', Validators.required],
      alineacion: ['', Validators.required],
      Lore: ['', Validators.required],
      Personalidad: ['', Validators.required],
      Raza: ['', Validators.required],
      Clase: ['', Validators.required],
      Hechizos: ['', Validators.required],
      Estadisticas: ['', Validators.required],
      Habilidades: ['', Validators.required],
    })
    this.id = Math.floor(Math.random() * (999999999999 - 1) + 2);
  }

  ngOnInit(): void {
  }

  crearCharacter()  {
    this.auth.user$
    .subscribe((profile) => {
      console.log(profile?.sub)
    console.log(this.auth.getUser())
    let userId: string
    if(profile?.sub !== undefined) {
      userId = profile.sub
    } else {
      userId = this.characterForm.get('id')?.value
    }
    if(this.characterForm.get('id')?.value !== undefined && this.characterForm.get('nombre')?.value !== undefined && this.characterForm.get('alineacion')?.value !== undefined && this.characterForm.get('Lore')?.value !== undefined, this.characterForm.get('IdOwner')?.value !== undefined, this.characterForm.get('Personalidad')?.value!==undefined, this.characterForm.get('Raza')?.value!==undefined, this.characterForm.get('Clase')?.value!==undefined, this.characterForm.get('Hechizos')?.value!==undefined, this.characterForm.get('Estadisticas')?.value!==undefined, this.characterForm.get('Habilidades')?.value!==undefined) {
    const Character = new Personaje (this.id, this.characterForm.get('nombre')?.value, this.characterForm.get('alineacion')?.value, this.characterForm.get('Lore')?.value, userId, this.characterForm.get('Personalidad')?.value, this.characterForm.get('Raza')?.value, this.characterForm.get('Clase')?.value, this.characterForm.get('Hechizos')?.value, this.characterForm.get('Estadisticas')?.value, this.characterForm.get('Habilidades')?.value )
    this.characterService.addCharacter(Character).subscribe()
    this.characterForm.reset()
    console.log(profile?.sub)
    }
  });
  }

}
