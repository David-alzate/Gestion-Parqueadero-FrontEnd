import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SedeService } from '../services/sede/sede.service';
import { VehiculosService } from '../services/vehiculos/vehiculos.service';
import { ClientesService } from '../services/clientes/clientes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoPlanesService } from '../services/tipoPlanes/tipo-planes.service';
import { PlanesService } from '../services/planes/planes.service';

@Component({
  selector: 'app-crear-plan',
  templateUrl: './crear-plan.component.html',
  styleUrls: ['./crear-plan.component.css']
})
export class CrearPlanComponent implements OnInit {

  PlanForm: FormGroup;
  sede: any;
  vehiculo: any;
  cliente: any;
  tipoPlan: any;
  plan: any[] = [];

  constructor(
    public fb: FormBuilder,
    public sedeService: SedeService,
    public vehiculoService: VehiculosService,
    public clienteService: ClientesService,
    public tipoPlanService: TipoPlanesService,
    public planService: PlanesService,
    private _snackBar: MatSnackBar
  ) {
    this.PlanForm = this.fb.group({
      sede: ['', Validators.required],
      vehiculo: ['', Validators.required],
      cliente: ['', Validators.required],
      tipoPlan: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
    });

  }
  ngOnInit(): void {

    this.sedeService.getAllSedes().subscribe(resp => {
      this.sede = resp.datos
    },
      error => { console.error(error) }
    );

    this.vehiculoService.getAllVehiculos().subscribe(resp => {
      this.vehiculo = resp.datos
    },
      error => { console.error(error) }
    );

    this.clienteService.getAllClientes().subscribe(resp => {
      this.cliente = resp.datos
    },
      error => { console.error(error) }
    );

    this.tipoPlanService.getAllTipoPlanes().subscribe(resp => {
      this.tipoPlan = resp.datos
    },
      error => { console.error(error) }
    );
  }



  guardarPlan(): void {
    if (this.PlanForm.valid) {
      this.planService.savePlan(this.PlanForm.value).subscribe(
        resp => {
          this._snackBar.open(resp.mensajes[0], '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
          this.PlanForm.reset();
          this.plan.push(resp);
          console.log(resp);
        },
        error => {
          console.error(error);
          console.log(this.PlanForm.value);
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
