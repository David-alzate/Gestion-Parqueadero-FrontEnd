import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CeldasService } from '../../services/celdas/celdas.service';
import { SedeService } from '../../services/sede/sede.service';
import { TipoVehiculoService } from '../../services/tipoVehiculo/tipo-vehiculo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-celdas',
  templateUrl: './crear-celdas.component.html',
  styleUrls: ['./crear-celdas.component.css']
})
export class CrearCeldasComponent implements OnInit {

  CeldaForm: FormGroup;
  sede: any;
  tipoVehiculo: any;
  celda: any[] = [];

  constructor(
    public fb: FormBuilder,
    public celdaService: CeldasService,
    public sedeService: SedeService,
    public tipoVehiculosService: TipoVehiculoService,
    private _snackBar: MatSnackBar,
  ) {
    this.CeldaForm = this.fb.group({
      sede: ['', Validators.required],
      tipoVehiculo: ['', Validators.required],
      cantidadCeldas: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.sedeService.getAllSedes().subscribe(resp => {
      this.sede = resp.datos
    },
      error => { console.error(error) }
    );

    this.tipoVehiculosService.getAllTipoVehiculo().subscribe(resp => {
      this.tipoVehiculo = resp.datos
    },
      error => { console.error(error) }
    );
  }

  guardarCelda() {
    if (this.CeldaForm.valid) {
      this.celdaService.saveCelda(this.CeldaForm.value).subscribe(
        resp => {
          this._snackBar.open(resp.mensajes[0], '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
          this.CeldaForm.reset();
          this.sede.push(resp);
        },
        error => {
          console.error(error);
          this._snackBar.open(error.error.mensajes[0], '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
        }
      );
    } else {
      this._snackBar.open('Formulario inválido. Por favor, completa todos los campos requeridos.', '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      })
    }
  }


}
