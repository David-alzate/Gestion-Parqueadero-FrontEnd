import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public loginService: LoginService,
    private router: Router
  ){
    this.loginForm = this.fb.group({
      correoElectronico: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  iniciarSesion(): void {
    this.loginService.login(this.loginForm.value).subscribe(
      resp => {
        if (resp.success) {
          alert(resp.mensajes[0]);
          this.router.navigate(['/parqueadero']);
        } else {
          alert(resp.mensajes[0]);
        }
      },
      error => { 
        console.error(error); 
        if (error.error && error.error.mensajes) {
          alert(error.error.mensajes[0]);
      }
    }
    );
  }
  
}
