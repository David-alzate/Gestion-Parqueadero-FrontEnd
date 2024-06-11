import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  datos: any[] = [];

  constructor(
    public fb: FormBuilder,
    public LoginService: LoginService
  ){
    this.loginForm = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  iniciarSesion(): void{
    this.LoginService.login(this.loginForm.value).subscribe(resp => {
      alert(resp.mensajes[0]);
      this.loginForm.reset();
      this.datos.push(resp);
      console.log(resp);
  },
    error => { console.error(error); alert(error.error.mensajes[0]); }
    
  );
  }

}
