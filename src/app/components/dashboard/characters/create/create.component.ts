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
import { DomSanitizer } from '@angular/platform-browser';
import { ImagesService } from 'src/app/services/imageService/images.service'
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})


export class CreateComponent implements OnInit {
  previsualizacion: string = "";
  listRaces: Raza[] = [];
  listClasses: Clase[] = [];
  titulo = 'Creating character'
  characterForm: FormGroup;
  id: string;
  SelectedClass: any;
  SelectedRace: any;
  selectedFile : string ="";
  imageData: string = "";
  imagenes: any = []

  changeClass(e: any) {
    this.SelectedClass = e.target.value
  }
  changeRace(e: any) {
    this.SelectedRace = e.target.value
  }
  // onFileChanged(event: any) {
  //   this.selectedFile = event.target.files[0]
  //   if (event.target.files) {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files)
  //   }
  // }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
    this.extraerBase64(this.selectedFile).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);

    })
    this.imagenes.push(this.selectedFile)
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
    return null
  })

  constructor(private imageService: ImagesService, private sanitizer: DomSanitizer, private fb: FormBuilder, private aRouter: ActivatedRoute, private characterService: CharactersService, private RaceService: RacesServiceService, private ClassService: ClassesServiceService, private userService: UsersService, public auth: AuthService) {
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
    this.id = uuidv4();
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
          this.characterService.addCharacter(Character).subscribe()
          this.imageService.post
          // const CharacterData= new FormData();
          // CharacterData.append("id", Character._id+"")
          // CharacterData.append("image", this.selectedFile, Character._id+"")
          // console.log(CharacterData.get)

          const fd = new FormData()
          fd.append('files', this.selectedFile)
          fd.append('_id', this.id)
          console.log(fd)
          console.log("id: "+this.id+"files: "+this.selectedFile)
          this.imageService.post(this.id, this.selectedFile).subscribe()
          this.characterForm.reset()
        }
      });
  }

}
