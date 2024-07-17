import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculosService } from 'src/app/services/vehiculos/vehiculos.service';
import { TipoVehiculoService } from 'src/app/services/tipoVehiculo/tipo-vehiculo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditarParqueaderoComponent } from 'src/app/lista-parqueadero/editar-parqueadero/editar-parqueadero.component';

@Component({
  selector: 'app-editar-vehiculo',
  templateUrl: './editar-vehiculo.component.html',
  styleUrls: ['./editar-vehiculo.component.css']
})
export class EditarVehiculoComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditarParqueaderoComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  vehiculoForm: FormGroup;
  id: any;
  tipoVehiculo: any;
  vehiculo: any[] = [];

  constructor(
    public fb: FormBuilder,
    public vehiculosService: VehiculosService,
    public tipoVehiculoService: TipoVehiculoService,
    private _snackBar: MatSnackBar
  ) {
    this.vehiculoForm = this.fb.group({
      placa: ['', Validators.required],
      tipoVehiculo: ['', Validators.required],
    });
    this.id = this.data.id.id;
  }


  ngOnInit(): void {
    this.tipoVehiculoService.getAllTipoVehiculo().subscribe(respTipoVehiculo => {
      this.tipoVehiculo = respTipoVehiculo.datos

      this.cargarDatosVehiculo();
    },
      errorTipoVehiculo => { console.error(errorTipoVehiculo) }
    );
  }

  cargarDatosVehiculo() {
    const TipoVehiculoSeleccionado = this.data.id.tipoVehiculo;

    const TipoVehiculo = this.tipoVehiculo.find((tipoVehiculo: {id: any; }) => tipoVehiculo.id === TipoVehiculoSeleccionado.id);

    this.vehiculoForm.setValue({
      placa: this.data.id.placa,
      tipoVehiculo: TipoVehiculo
    });
  }

  actualizarVehiculo() {
    if (this.vehiculoForm.valid) {
      const parqueaderoData = this.vehiculoForm.value;
      this.vehiculosService.updateVehiculo(this.id, parqueaderoData).subscribe(
        (response) => {
          this._snackBar.open(response.mensajes[0], '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
          this.dialogRef.close(true);
        },
        (error) => {
          this._snackBar.open(error.error.mensajes[0], '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      );
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

}
