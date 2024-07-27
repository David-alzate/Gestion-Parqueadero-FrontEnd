import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { SedeService } from 'src/app/services/sede/sede.service';
import { SesionesParqueoService } from 'src/app/services/sesionParqueo/sesiones-parqueo.service';
import { TipoVehiculoService } from 'src/app/services/tipoVehiculo/tipo-vehiculo.service';

@Component({
  selector: 'app-ingreso-vehiculo',
  templateUrl: './ingreso-vehiculo.component.html',
  styleUrls: ['./ingreso-vehiculo.component.css']
})
export class IngresoVehiculoComponent implements OnInit {

  ingresoVehiculoForm: FormGroup;
  sede: any;
  empleado: any[] = [];
  tipoVehiculo: any;

  constructor(
    public fb: FormBuilder,
    public sedeService: SedeService,
    public empleadoService: EmpleadosService,
    public sesionParqueoService: SesionesParqueoService,
    public tipoVehiculoService: TipoVehiculoService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.ingresoVehiculoForm = this.fb.group({
      sede: ['', Validators.required],
      empleado: ['', Validators.required],
      placa: ['', Validators.required],
      tipoVehiculo: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    this.sedeService.getAllSedes().subscribe(resp => {
      this.sede = resp.datos;
    }, error => {
      console.error(error);
    });

    this.empleadoService.getAllEmpleados().subscribe(resp => {
      this.empleado = resp.datos;
    }, error => {
      console.error(error);
    });

    this.tipoVehiculoService.getAllTipoVehiculo().subscribe(resp => {
      this.tipoVehiculo = resp.datos;
    }, error => {
      console.error(error);
    });


  }

  ingresarVehiculo(): void {
    if (this.ingresoVehiculoForm.valid) {
      this.sesionParqueoService.ingresarVehiculo(this.ingresoVehiculoForm.value).subscribe(
        resp => {
          this._snackBar.open(resp.mensajes[0], '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.ingresoVehiculoForm.reset();
          this.sede.push(resp);
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
