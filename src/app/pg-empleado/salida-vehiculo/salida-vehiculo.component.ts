import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SesionesParqueoService } from 'src/app/services/sesionParqueo/sesiones-parqueo.service';

@Component({
  selector: 'app-salida-vehiculo',
  templateUrl: './salida-vehiculo.component.html',
  styleUrls: ['./salida-vehiculo.component.css']
})
export class SalidaVehiculoComponent {

  salidaVehiculoForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public sesionParqueoService: SesionesParqueoService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.salidaVehiculoForm = this.fb.group({
      placa: ['', Validators.required],
    });
  }

  salidaVehiculo(): void {
    if (this.salidaVehiculoForm.valid) {
      this.sesionParqueoService.salidaVehiculo(this.salidaVehiculoForm.value).subscribe(
        resp => {
          this._snackBar.open(resp.mensajes[0], '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.salidaVehiculoForm.reset();
        },
        error => {
          console.error(error);
          this._snackBar.open(error.error.mensajes[0], '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      );
    } else {
      this._snackBar.open('Formulario inválido. Por favor, completa todos los campos requeridos.', '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

}
