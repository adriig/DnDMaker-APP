import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading= false;
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) { 
    this.form=fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  ngOnInit(): void {
  }

  ingresar() {
    const user = this.form.value.usuario;
    const password = this.form.value.password;
    
    if(user=="adri" && password=="123") {
      // Redirección
      this.fakeLoadingCLI()
    } else if(user=="admin" && password=="123") {
      this.fakeLoadingEMP()
    } else {
      this.error()
      this.form.reset()
    }
  }

  error() {
    this._snackBar.open('Usuario o contraseña ingresado son invalidos', '', {
      duration: 3000,
      horizontalPosition: 'center' ,
      verticalPosition: 'bottom'
    }) 
  }

  fakeLoadingEMP() {
    this.loading=true;
    setTimeout(() => {
      this.router.navigate(['administration']);
    }, 1500);
  }

  fakeLoadingCLI() {
    this.loading=true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 1500);
  }
}
