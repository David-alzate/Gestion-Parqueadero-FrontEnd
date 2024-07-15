import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoVehiculoService } from '../services/tipoVehiculo/tipo-vehiculo.service';
import { VehiculosService } from '../services/vehiculos/vehiculos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-vehiculo',
  templateUrl: './crear-vehiculo.component.html',
  styleUrls: ['./crear-vehiculo.component.css']
})
export class CrearVehiculoComponent implements OnInit {

  vehiculoForm: FormGroup;
  tipoVehiculo: any;
  vehiculo: any[] = [];

  constructor(
    public fb: FormBuilder,
    public vehiculoService: VehiculosService,
    public tipoVehiculoService: TipoVehiculoService,
    private _snackBar: MatSnackBar
  ){
    this.vehiculoForm = this.fb.group({
      placa: ['', Validators.required],
      tipoVehiculo: ['', Validators.required],
    });

  }
  ngOnInit(): void {
    this.tipoVehiculoService.getAllTipoVehiculo().subscribe(resp => {
      this.tipoVehiculo = resp.datos
    },
      error => { console.error(error) }
    );
  }

  guardarVehiculo(): void {
    if (this.vehiculoForm.valid) {
      this.vehiculoService.saveVehiculo(this.vehiculoForm.value).subscribe(
        resp => {
          this._snackBar.open(resp.mensajes[0], '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
          this.vehiculoForm.reset();
          this.vehiculo.push(resp);
          console.log(resp);
        },
        error => {
          console.error(error);
          this._snackBar.open(error.error.mensajes[0], '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
        }
      );
    } else {
      this._snackBar.open('Formulario inválido. Por favor, completa todos los campos requeridos.', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      })
    }
  }
  

}
