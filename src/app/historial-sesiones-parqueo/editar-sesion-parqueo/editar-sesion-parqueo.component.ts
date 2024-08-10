import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditarParqueaderoComponent } from 'src/app/lista-parqueadero/editar-parqueadero/editar-parqueadero.component';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { EstadosService } from 'src/app/services/estados/estados.service';
import { SedeService } from 'src/app/services/sede/sede.service';
import { SesionesParqueoService } from 'src/app/services/sesionParqueo/sesiones-parqueo.service';
import { TipoVehiculoService } from 'src/app/services/tipoVehiculo/tipo-vehiculo.service';

@Component({
  selector: 'app-editar-sesion-parqueo',
  templateUrl: './editar-sesion-parqueo.component.html',
  styleUrls: ['./editar-sesion-parqueo.component.css']
})
export class EditarSesionParqueoComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditarParqueaderoComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  SesionParqueoForm: FormGroup;
  id: any;
  sede: any;
  tipoVehiculo: any;
  empleado: any;

  constructor(
    public fb: FormBuilder,
    public sedeService: SedeService,
    public empleadoService: EmpleadosService,
    public sesionParqueoService: SesionesParqueoService,
    public tipoVehiculoService: TipoVehiculoService,
    private _snackBar: MatSnackBar
  ) {
    this.SesionParqueoForm = this.fb.group({
      sede: ['', Validators.required],
      placa: ['', Validators.required],
      tipoVehiculo: ['', Validators.required],
      empleado: ['', Validators.required],
    });
    this.id = this.data.id.id;
  }


  ngOnInit(): void {
    this.sedeService.getAllSedes().subscribe(respSede => {
      this.sede = respSede.datos

      this.empleadoService.getAllEmpleados().subscribe(respEmpleado => {
        this.empleado = respEmpleado.datos

        this.tipoVehiculoService.getAllTipoVehiculo().subscribe(respTipoVehiculo => {
          this.tipoVehiculo = respTipoVehiculo.datos

          this.cargarDatosSesiones();

        },
          respTipoVehiculo => { console.error(respTipoVehiculo) }
        );

      },
        errorEmpleado => { console.error(errorEmpleado) }
      );

    },
      errorSede => { console.error(errorSede) }
    );
  }

  cargarDatosSesiones() {
    const sedeSeleccionada = this.data.id.sede;
    const empleadoSeleccionada = this.data.id.empleado;
    const tipoVehiculoSeleccionada = this.data.id.tipoVehiculo;

    const sede = this.sede.find((sede: { id: any; }) => sede.id === sedeSeleccionada.id);
    const empleado = this.empleado.find((empleado: { id: any; }) => empleado.id === empleadoSeleccionada.id);
    const tipoVehiculo = this.tipoVehiculo.find((tipoVehiculo: { id: any; }) => tipoVehiculo.id === tipoVehiculoSeleccionada.id);

    this.SesionParqueoForm.setValue({
      sede: sede,
      placa: this.data.id.placa,
      tipoVehiculo: tipoVehiculo,
      empleado: empleado,
    });
  }

  actualizarSesion() {
    if (this.SesionParqueoForm.valid) {
      const parqueaderoData = this.SesionParqueoForm.value;
      this.sesionParqueoService.updateSesion(this.id, parqueaderoData).subscribe(
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
