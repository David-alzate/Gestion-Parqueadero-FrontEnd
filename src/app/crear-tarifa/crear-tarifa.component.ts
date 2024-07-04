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
      fechainiciovigencia: ['', Validators.required],
      fechafinvigencia: ['', Validators.required]
    });
  }


  ngOnInit(): void {

  }

  guardarTarifa(){
  }

}
