import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Personaje } from 'src/app/models/character/character';
import { CharactersService } from 'src/app/services/characterService/characters.service';
import { RacesServiceService } from 'src/app/services/racesService/races-service.service';
import { ClassesServiceService } from 'src/app/services/classesService/classes-service.service';
import { UsersService } from 'src/app/services/userService/users.service';
import { AuthService } from '@auth0/auth0-angular';
import { Raza } from 'src/app/models/races/races'
import { Clase } from 'src/app/models/classes/class';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})


export class CreateComponent implements OnInit {
  listRaces: Raza[] = [];
  listClasses: Clase[] = [];
  titulo = 'Creating character'
  characterForm: FormGroup;
  id: number;
  SelectedClass: any;
  SelectedRace: any;
  selectedFile : any;
  imageData: string = "";

  changeClass(e: any) {
    this.SelectedClass = e.target.value
  }
  changeRace(e: any) {
    this.SelectedRace = e.target.value
  }
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0]
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files)
    }
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
  //   this.characterForm.patchValue({ image: file });
  //   const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
  //   if (file && allowedMimeTypes.includes(file.type)) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imageData = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);
  // }
  }

  constructor(private fb: FormBuilder, private aRouter: ActivatedRoute, private characterService: CharactersService, private RaceService: RacesServiceService, private ClassService: ClassesServiceService, private userService: UsersService, public auth: AuthService) {
    this.characterForm = this.fb.group({
      nombre: ['', Validators.required],
      alineacion: ['', Validators.required],
      Lore: ['', Validators.required],
      Personalidad: ['', Validators.required],
      Raza: ['', Validators.required],
      Clase: ['', Validators.required],
      Hechizos: ['', Validators.required],
      Estadisticas: ['', Validators.required],
      Habilidades: ['', Validators.required]
    })
    this.id = Math.floor(Math.random() * (999999999999 - 1) + 2);
  }

  ngOnInit(): void {
    let userId: string;
    let myClasses: any
    this.auth.user$
      .subscribe((profile) => {
        if (profile?.sub !== undefined) {
          userId = profile.sub
        }
        this.userService.getClassesOfUser(userId).subscribe(data => {
          myClasses = data
          console.log(myClasses)

          this.ClassService.getPickeableClasses(userId, myClasses).subscribe(data => {
            this.listClasses = data;
            console.log(this.listClasses)
          })
        })

        this.RaceService.getRaces().subscribe(data => {
          this.listRaces = data;
        })
      }
      )
  };



  crearCharacter() {
    this.auth.user$
      .subscribe((profile) => {
        console.log(profile?.sub)
        console.log(this.auth.getUser())
        let userId: string
        if (profile?.sub !== undefined) {
          userId = profile.sub
        } else {
          userId = this.characterForm.get('id')?.value
        }
        if (this.characterForm.get('nombre')?.value !== undefined && this.characterForm.get('alineacion')?.value !== undefined && this.characterForm.get('Lore')?.value !== undefined, this.characterForm.get('Personalidad')?.value !== undefined, this.characterForm.get('Raza')?.value !== undefined, this.characterForm.get('Clase')?.value !== undefined, this.characterForm.get('Hechizos')?.value !== undefined, this.characterForm.get('Estadisticas')?.value !== undefined, this.characterForm.get('Habilidades')?.value !== undefined) {
          const Character = new Personaje(this.id, this.characterForm.get('nombre')?.value, this.characterForm.get('alineacion')?.value, this.characterForm.get('Lore')?.value, userId, this.characterForm.get('Personalidad')?.value, this.characterForm.get('Raza')?.value, this.characterForm.get('Clase')?.value, this.characterForm.get('Hechizos')?.value, this.characterForm.get('Estadisticas')?.value, this.characterForm.get('Habilidades')?.value, "")
          // this.characterService.addCharacter(Character, this.selectedFile).subscribe()

          const CharacterData= new FormData();
          CharacterData.append("id", Character._id+"")
          CharacterData.append("image", this.selectedFile, Character._id+"")
          console.log(CharacterData)

          const fd = new FormData()
          this.characterForm.reset()
          console.log(profile?.sub)
        }
      });
  }

}
