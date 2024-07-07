import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadosService } from '../services/estados/estados.service';
import { TipoTatifasService } from '../services/tipoTarifas/tipo-tatifas.service';
import { TipoVehiculoService } from '../services/tipoVehiculo/tipo-vehiculo.service';
import { TarifasService } from '../services/tarifas/tarifas.service';
import { SedeService } from '../services/sede/sede.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-tarifa',
  templateUrl: './crear-tarifa.component.html',
  styleUrls: ['./crear-tarifa.component.css']
})
export class CrearTarifaComponent implements OnInit{

  TarifaForm: FormGroup;
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
  ){
    this.TarifaForm = this.fb.group({
      sede: ['', Validators.required],
      tipoVehiculo: ['', Validators.required],
      tipoTarifa: ['', Validators.required],
      tarifa: ['', Validators.required],
      estado: ['', Validators.required],
      fechaInicioVigencia: ['', Validators.required],
      fechaFinVigencia: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.sedeService.getAllSedes().subscribe(resp => {
      this.sede = resp.datos
    },
      error => { console.error(error) }
    );

    this.estadosService.getAllEstados().subscribe(resp => {
      this.estado = resp.datos
    },
      error => { console.error(error) }
    );

    this.tipoTarifasService.getAllTiposTarifa().subscribe(resp => {
      this.tipoTarifa = resp.datos
    },
      error => { console.error(error) }
    );

    this.tipoVehiculosService.getAllTipoVehiculo().subscribe(resp => {
      this.tipoVehiculo = resp.datos
    },
      error => { console.error(error) }
    );

  
  }

  guardarTarifa(){
    if (this.TarifaForm.valid) {
      this.tarifasService.saveTarifa(this.TarifaForm.value).subscribe(
        resp => {
          this._snackBar.open(resp.mensajes[0], '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
          this.TarifaForm.reset();
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
