import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditarParqueaderoComponent } from 'src/app/lista-parqueadero/editar-parqueadero/editar-parqueadero.component';
import { EstadosService } from 'src/app/services/estados/estados.service';
import { SedeService } from 'src/app/services/sede/sede.service';
import { TarifasService } from 'src/app/services/tarifas/tarifas.service';
import { TipoTatifasService } from 'src/app/services/tipoTarifas/tipo-tatifas.service';
import { TipoVehiculoService } from 'src/app/services/tipoVehiculo/tipo-vehiculo.service';

@Component({
  selector: 'app-editar-tarifa',
  templateUrl: './editar-tarifa.component.html',
  styleUrls: ['./editar-tarifa.component.css']
})
export class EditarTarifaComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditarParqueaderoComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  TarifaForm: FormGroup;
  id: any;
  estado: any;
  tipoTarifa: any;
  tipoVehiculo: any;
  sede: any;
  tarifa: any[] = [];

  constructor(
    public fb: FormBuilder,
    public tarifasService: TarifasService,
    public sedeService: SedeService,
    public estadosService: EstadosService,
    public tipoTarifasService: TipoTatifasService,
    public tipoVehiculosService: TipoVehiculoService,
    private _snackBar: MatSnackBar,
  ) {
    this.TarifaForm = this.fb.group({
      sede: ['', Validators.required],
      tipoVehiculo: ['', Validators.required],
      tipoTarifa: ['', Validators.required],
      tarifa: ['', Validators.required],
      estado: ['', Validators.required],
      fechaInicioVigencia: ['', Validators.required],
      fechaFinVigencia: ['', Validators.required]
    });
    this.id = this.data.id.id;
  }



  ngOnInit(): void {
    this.sedeService.getAllSedes().subscribe(respSedes => {
      this.sede = respSedes.datos

      this.estadosService.getAllEstados().subscribe(respEstados => {
        this.estado = respEstados.datos

        this.tipoTarifasService.getAllTiposTarifa().subscribe(respTarifas => {
          this.tipoTarifa = respTarifas.datos

          this.tipoVehiculosService.getAllTipoVehiculo().subscribe(respTipoVehiculo => {
            this.tipoVehiculo = respTipoVehiculo.datos

            this.cargarDatosTarifa();
          },
            (errorSedes) => {
              console.error(errorSedes);
            }
          );
        },
          (errorEstados) => {
            console.error(errorEstados);
          }
        );
      },
        (errorTipoTarifa) => {
          console.error(errorTipoTarifa);
        }
      );
    },
    (errorTipoVehiculo) => {
      console.error(errorTipoVehiculo);
    }
    );
  }

  cargarDatosTarifa() {
    const TipoVehiculoSeleccionado = this.data.id.tipoVehiculo;
    const TipoTarifaSeleccionado = this.data.id.tipoTarifa;
    const EstadoSeleccionado = this.data.id.estado;
    const SedeSeleccionado = this.data.id.sede;

    const TipoVehiculo = this.tipoVehiculo.find((tipoVehiculo: {id: any; }) => tipoVehiculo.id === TipoVehiculoSeleccionado.id);
    const TipoTarifa = this.tipoTarifa.find((tipoTarifa: {id: any; }) => tipoTarifa.id === TipoTarifaSeleccionado.id);
    const Estado = this.estado.find((estado: {id: any; }) => estado.id === EstadoSeleccionado.id);
    const sede = this.sede.find((sede: { id: any; }) => sede.id === SedeSeleccionado.id);

    this.TarifaForm.setValue({
      sede: sede,
      tipoVehiculo: TipoVehiculo,
      tipoTarifa: TipoTarifa,
      tarifa: this.data.id.tarifa,
      estado: Estado,
      fechaInicioVigencia: this.data.id.fechaInicioVigencia,
      fechaFinVigencia: this.data.id.fechaFinVigencia
    });
  }

  actualizarTarifa() {
    if (this.TarifaForm.valid) {
      const parqueaderoData = this.TarifaForm.value;
      this.tarifasService.updateTarifa(this.id, parqueaderoData).subscribe(
        (response) => {
          this._snackBar.open(response.mensajes[0], '', {
            duration: 3000
          });
          this.dialogRef.close(true);
        },
        (error) => {
          this._snackBar.open(error.mensajes[0], '', {
            duration: 3000
          });
        }
      );
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

}
