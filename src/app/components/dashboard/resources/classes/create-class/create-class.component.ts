import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Personaje } from 'src/app/models/character/character';
import { Clase } from 'src/app/models/classes/class'
import { CharactersService } from 'src/app/services/characterService/characters.service';
import { ClassesServiceService } from 'src/app/services/classesService/classes-service.service'
import { AuthService } from '@auth0/auth0-angular';
@Component({
   selector: 'app-create-class',
   templateUrl: './create-class.component.html',
   styleUrls: ['./create-class.component.css']
})


export class CreateClassComponent implements OnInit {
  titulo = 'Creating class'
  classesForm: FormGroup;
  id: number;
  constructor(private fb: FormBuilder, private aRouter: ActivatedRoute, private classService: ClassesServiceService, public auth: AuthService) {
    this.classesForm = this.fb.group({
      Nombre: ['', Validators.required],
      Habilidades: ['', Validators.required],
      Descripcion: ['', Validators.required],
      PG: ['', Validators.required],
      Salvacion: ['', Validators.required],
    })
    this.id = Math.floor(Math.random() * (999999999999 - 1) + 2);
  }

  ngOnInit(): void {
  }

  crearCharacter()  {
    this.auth.user$
    .subscribe((profile) => {
      console.log(profile?.sub)
    let userId: string
    if(profile?.sub !== undefined) {
      userId = profile.sub
    } else {
      userId = this.classesForm.get('id')?.value
    }
    if(this.classesForm.get('id')?.value !== undefined && this.classesForm.get('Nombre')?.value !== undefined && this.classesForm.get('Habilidades')?.value !== undefined && this.classesForm.get('Descripcion')?.value !== undefined, this.classesForm.get('PG')?.value !== undefined, this.classesForm.get('Salvacion')?.value!==undefined) {
    const Character = new Clase (this.id, this.classesForm.get('Nombre')?.value, this.classesForm.get('Habilidades')?.value, this.classesForm.get('PG')?.value, this.classesForm.get('Salvacion')?.value, this.classesForm.get('Descripcion')?.value, userId)
    console.log(Character)
    this.classService.addClass(Character).subscribe()
    this.classesForm.reset()
    }
  });
  }

}
