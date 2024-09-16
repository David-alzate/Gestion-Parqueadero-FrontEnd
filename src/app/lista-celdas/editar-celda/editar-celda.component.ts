import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditarParqueaderoComponent } from 'src/app/lista-parqueadero/editar-parqueadero/editar-parqueadero.component';
import { CeldasService } from 'src/app/services/celdas.service';
import { SedeService } from 'src/app/services/sede/sede.service';
import { TipoVehiculoService } from 'src/app/services/tipoVehiculo/tipo-vehiculo.service';

@Component({
  selector: 'app-editar-celda',
  templateUrl: './editar-celda.component.html',
  styleUrls: ['./editar-celda.component.css']
})
export class EditarCeldaComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<EditarParqueaderoComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  CeldaForm: FormGroup;
  id: any;
  sede: any;
  tipoVehiculo: any;
  celda: any[] = [];

  constructor(
    public fb: FormBuilder,
    public celdaServic: CeldasService,
    public sedeService: SedeService,
    public tipoVehiculoService: TipoVehiculoService,
    private _snackBar: MatSnackBar
  ) {
    this.CeldaForm = this.fb.group({
      sede: ['', Validators.required],
      tipoVehiculo: ['', Validators.required],
      cantidadCeldas: ['', Validators.required],
    });
    this.id = this.data.id.id;
  }

  ngOnInit(): void {
    this.sedeService.getAllSedes().subscribe(respSede => {
      this.sede = respSede.datos

      this.tipoVehiculoService.getAllTipoVehiculo().subscribe(respTipoVehiculo => {
        this.tipoVehiculo = respTipoVehiculo.datos

      this.cargarDatosCeldas();

    },
    (errorSede) => {
      console.error(errorSede);
    }
  );
  },
  (errorTipoVehiculo) => {
    console.error(errorTipoVehiculo);
  }
  );

  }
  
  cargarDatosCeldas() {
    const TipoVehiculoSeleccionado = this.data.id.tipoVehiculo;
    const SedeSeleccionado = this.data.id.sede;

    const tipoVehiculo = this.tipoVehiculo.find((tipoIdentificacion: { id: any; }) => tipoIdentificacion.id === TipoVehiculoSeleccionado.id);
    const sede = this.sede.find((sede: { id: any; }) => sede.id === SedeSeleccionado.id);

    this.CeldaForm.setValue({
      cantidadCeldas: this.data.id.cantidadCeldas,
      tipoVehiculo: tipoVehiculo,
      sede: sede,
    });
  }

  actualizarCelda() {
    if (this.CeldaForm.valid) {
      const parqueaderoData = this.CeldaForm.value;
      this.celdaServic.updateCelda(this.id, parqueaderoData).subscribe(
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
