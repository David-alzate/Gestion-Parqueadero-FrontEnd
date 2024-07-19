import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoVehiculoService } from '../services/tipoVehiculo/tipo-vehiculo.service';
import { VehiculosService } from '../services/vehiculos/vehiculos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-vehiculo',
  templateUrl: './crear-vehiculo.component.html',
  styleUrls: ['./crear-vehiculo.component.css']
})
export class CrearVehiculoComponent implements OnInit {

  vehiculoForm: FormGroup;
  tipoVehiculo: any;
  vehiculo: any[] = [];
  esDialogo: boolean = false;

  constructor(
    public fb: FormBuilder,
    public vehiculoService: VehiculosService,
    public tipoVehiculoService: TipoVehiculoService,
    private _snackBar: MatSnackBar,
    @Optional() public dialogRef: MatDialogRef<CrearVehiculoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.vehiculoForm = this.fb.group({
      placa: ['', Validators.required],
      tipoVehiculo: ['', Validators.required],
    });

    if (data && data.esDialogo) {
      this.esDialogo = true;
    }
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
          });
          this.vehiculoForm.reset();
          this.vehiculo.push(resp);
          console.log(resp);

          if (this.esDialogo && this.dialogRef) {
            this.dialogRef.close();
          }
        },
        error => {
          console.error(error);
          this._snackBar.open(error.error.mensajes[0], '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      );
    } else {
      this._snackBar.open('Formulario inválido. Por favor, completa todos los campos requeridos.', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  cerrarDialogo() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}