import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditarParqueaderoComponent } from 'src/app/lista-parqueadero/editar-parqueadero/editar-parqueadero.component';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { SedeService } from 'src/app/services/sede/sede.service';
import { TipoEmpleadosService } from 'src/app/services/tipoEmpleados/tipo-empleados.service';
import { TipoIdentificacionService } from 'src/app/services/tipoIdentificacion/tipo-identificacion.service';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditarParqueaderoComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  EmpleadoForm: FormGroup;
  id: any;
  tipoIdentificacion: any;
  tipoEmpleado: any;
  sede: any;
  empleado: any[] = [];

  hide = true;

  toggleVisibility() {
    this.hide = !this.hide;
  }

  constructor(
    public fb: FormBuilder,
    public empleadoService: EmpleadosService,
    public tipoIdentificacionService: TipoIdentificacionService,
    public tipoEmpleadoService: TipoEmpleadosService,
    public sedeService: SedeService,
    private _snackBar: MatSnackBar
  ) {
    this.EmpleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],
      numeroIdentificacion: ['', Validators.required],
      correoElectronico: ['', Validators.required],
      tipoEmpleado: ['', Validators.required],
      sede: ['', Validators.required],
      password: ['', Validators.required],

    });
    this.id = this.data.id.id;
  }



  ngOnInit(): void {
    this.tipoIdentificacionService.getAllTipoIdentificaciones().subscribe(respTipoIdentificaciones => {
      this.tipoIdentificacion = respTipoIdentificaciones.datos

      this.tipoEmpleadoService.getAllTipoEmpleados().subscribe(respTipoEmpleados => {
        this.tipoEmpleado = respTipoEmpleados.datos

        this.sedeService.getAllSedes().subscribe(respSedes => {
          this.sede = respSedes.datos

          this.cargarDatosEmpleado();
        },
        (errorTipoIdentificacion) => {
          console.error(errorTipoIdentificacion);
        }
      );
      },
      (errorTipoEmpleado) => {
        console.error(errorTipoEmpleado);
      }
      );
    },
    (errorTipoIdentificacion) => {
      console.error(errorTipoIdentificacion);
    }
  );

  }

  cargarDatosEmpleado() {
    const TipoIdentificacionSeleccionado = this.data.id.tipoIdentificacion;
    const TipoEmpleadoSeleccionado = this.data.id.tipoEmpleado;
    const SedeSeleccionado = this.data.id.sede;

    const tipoIdentificacion = this.tipoIdentificacion.find((tipoIdentificacion: { id: any; }) => tipoIdentificacion.id === TipoIdentificacionSeleccionado.id);
    const tipoEmpleado = this.tipoEmpleado.find((tipoEmpleado: { id: any; }) => tipoEmpleado.id === TipoEmpleadoSeleccionado.id);
    const sede = this.sede.find((sede: { id: any; }) => sede.id === SedeSeleccionado.id);

    this.EmpleadoForm.setValue({
      nombre: this.data.id.nombre,
      apellido: this.data.id.apellido,
      tipoIdentificacion: tipoIdentificacion,
      numeroIdentificacion: this.data.id.numeroIdentificacion,
      correoElectronico: this.data.id.correoElectronico,
      tipoEmpleado: tipoEmpleado,
      sede: sede,
      password: this.data.id.password
    });
  }

  actualizarEmpleado() {
    if (this.EmpleadoForm.valid) {
      const parqueaderoData = this.EmpleadoForm.value;
      this.empleadoService.updateEmpleado(this.id, parqueaderoData).subscribe(
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
