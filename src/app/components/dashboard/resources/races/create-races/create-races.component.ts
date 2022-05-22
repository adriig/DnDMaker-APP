import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Personaje } from 'src/app/models/character/character';
import { Clase } from 'src/app/models/classes/class'
import { Raza} from 'src/app/models/races/races'
import { CharactersService } from 'src/app/services/characterService/characters.service';
import { ClassesServiceService } from 'src/app/services/classesService/classes-service.service'
import { RacesServiceService } from 'src/app/services/racesService/races-service.service';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-create-races',
  templateUrl: './create-races.component.html',
  styleUrls: ['./create-races.component.css']
})


export class CreateRacesComponent implements OnInit {
  titulo = 'Creating class'
  racesForm: FormGroup;
  id: number;
  constructor(private fb: FormBuilder, private aRouter: ActivatedRoute, private RacesServiceService: RacesServiceService, public auth: AuthService) {
    this.racesForm = this.fb.group({
      Nombre: ['', Validators.required],
      Multiplicadores: ['', Validators.required],
      Habilidades: ['', Validators.required],
      Origen: ['', Validators.required],
      Nombres: ['', Validators.required],
    })
    this.id = Math.floor(Math.random() * (999999999999 - 1) + 2);
  }

  ngOnInit(): void {
  }

  createRace()  {
    this.auth.user$
    .subscribe((profile) => {
      console.log(profile?.sub)
    let userId: string
    if(profile?.sub !== undefined) {
      userId = profile.sub
    } else {
      userId = this.racesForm.get('id')?.value
    }
    if(this.racesForm.get('id')?.value !== undefined && this.racesForm.get('Nombre')?.value !== undefined && this.racesForm.get('Multiplicadores')?.value !== undefined && this.racesForm.get('Habilidades')?.value !== undefined, this.racesForm.get('Origen')?.value !== undefined, this.racesForm.get('Nombres')?.value!==undefined) {
    const Race = new Raza (this.id, this.racesForm.get('Nombre')?.value, this.racesForm.get('Multiplicadores')?.value, this.racesForm.get('Habilidades')?.value, this.racesForm.get('Origen')?.value, this.racesForm.get('Nombres')?.value, userId)
    console.log(Race)
    this.RacesServiceService.addRaces(Race).subscribe()
    this.racesForm.reset()
    }
  });
  }

}
