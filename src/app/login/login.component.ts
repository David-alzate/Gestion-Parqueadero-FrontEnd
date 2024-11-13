import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoEmpleadosService } from '../services/tipoEmpleados/tipo-empleados.service';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  tipoEmpleado!: any[];
  loading = false;
  hide = true;

  toggleVisibility() {
    this.hide = !this.hide;
  }

  constructor(
    public fb: FormBuilder,
    public tipoEmpleadoService: TipoEmpleadosService,
    public loginService: LoginService,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      tipoEmpleado: ['', Validators.required],
      numeroIdentificacion: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.tipoEmpleadoService.getAllTipoEmpleados().subscribe(
      resp => {
        this.tipoEmpleado = resp.datos;
      },
      error => {
        swal({
          title: 'Error al conectar con el servidor',
          text: "No se pudo obtener la información del servidor. Intenta nuevamente más tarde.",
          type: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar',
          buttonsStyling: true
        });
      }
    );
  }
  

  iniciarSesion(): void {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe(
        resp => {
          if (resp.success) {
            this.authService.login(resp.tipoEmpleado);
            this.loading = true;
            if (resp.tipoEmpleado == "Administrador"){
              setTimeout(() => {
                this.router.navigate(['/admin']);
              }, 1000);
              const mensaje = resp.mensajes[0];
              this._snackBar.open(mensaje, '', {
                duration: 1000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              })
            }
            if (resp.tipoEmpleado == "Empleado"){
              setTimeout(() => {
                this.router.navigate(['/empleado']);
              }, 1000);
              const mensaje = resp.mensajes[0];
              this._snackBar.open(mensaje, '', {
                duration: 1000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              })
            }
          } else {
            const mensaje = resp.mensajes[0];
            this._snackBar.open(mensaje, '', {
              duration: 1000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            })
          }
        },
        error => {
          console.error(error);
          if (error.error && error.error.mensajes) {
            const mensaje = error.error.mensajes[0];
            this._snackBar.open(mensaje, '', {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            })
          } else {
            this._snackBar.open('Ocurrió un error inesperado. Por favor, intente nuevamente más tarde.', '', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            })
          }
        }
      );
    }
  }
}
