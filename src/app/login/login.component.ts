import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoEmpleadosService } from '../services/tipoEmpleados/tipo-empleados.service';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  tipoEmpleado: any;

  constructor(
    public fb: FormBuilder,
    public tipoEmpleadoService: TipoEmpleadosService,
    public loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      tipoEmpleado: ['', Validators.required],
      numeroIdentificacion: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.tipoEmpleadoService.getAllTipoEmpleados().subscribe(resp => {
      this.tipoEmpleado = resp.datos
    },
      error => { console.error(error) }
    );
  }


  iniciarSesion(): void {
    this.loginService.login(this.loginForm.value).subscribe(
      resp => {
        if (resp.success) {
          this.authService.login();
          this.router.navigate(['/parqueadero']);
        } else {
          alert(resp.mensajes[0]);
        }
      },
      error => {
        console.error(error);
        if (error.error && error.error.mensajes) {
          alert(error.error.mensajes[0]);
        } else {
          alert('Ocurrió un error inesperado. Por favor, intente nuevamente más tarde.');
        }
      }
    );
  }
}