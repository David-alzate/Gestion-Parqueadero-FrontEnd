import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SedeService } from '../services/sede/sede.service';
import { VehiculosService } from '../services/vehiculos/vehiculos.service';
import { ClientesService } from '../services/clientes/clientes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoPlanesService } from '../services/tipoPlanes/tipo-planes.service';
import { PlanesService } from '../services/planes/planes.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearVehiculoComponent } from '../crear-vehiculo/crear-vehiculo.component';
import { CrearClienteComponent } from '../crear-cliente/crear-cliente.component';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { validItemValidator } from '../validators/custom-validators';

@Component({
  selector: 'app-crear-plan',
  templateUrl: './crear-plan.component.html',
  styleUrls: ['./crear-plan.component.css']
})
export class CrearPlanComponent implements OnInit {

  PlanForm: FormGroup;
  sede: any;
  vehiculos: any[] = [];
  clientes: any[] = [];
  tipoPlan: any;
  plan: any[] = [];

  vehiculoControl = new FormControl('', [Validators.required]);
  filteredVehiculos!: Observable<any[]>;
  clienteControl = new FormControl('', [Validators.required]);
  filteredClientes!: Observable<any[]>;

  constructor(
    public fb: FormBuilder,
    public sedeService: SedeService,
    public vehiculoService: VehiculosService,
    public clienteService: ClientesService,
    public tipoPlanService: TipoPlanesService,
    public planService: PlanesService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.PlanForm = this.fb.group({
      sede: ['', Validators.required],
      vehiculo: this.vehiculoControl,
      cliente: this.clienteControl,
      tipoPlan: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.sedeService.getAllSedes().subscribe(resp => {
      this.sede = resp.datos;
    }, error => {
      console.error(error);
    });

    this.vehiculoService.getAllVehiculos().subscribe(resp => {
      this.vehiculos = resp.datos;
      this.filteredVehiculos = this.vehiculoControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterVehiculos(value))
      );
      this.vehiculoControl.setValidators([Validators.required, validItemValidator(this.vehiculos)]);
    }, error => {
      console.error(error);
    });

    this.clienteService.getAllClientes().subscribe(resp => {
      this.clientes = resp.datos;
      this.filteredClientes = this.clienteControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterClientes(value))
      );
      this.clienteControl.setValidators([Validators.required, validItemValidator(this.clientes)]);
    }, error => {
      console.error(error);
    });

    this.tipoPlanService.getAllTipoPlanes().subscribe(resp => {
      this.tipoPlan = resp.datos;
    }, error => {
      console.error(error);
    });
  }

  private _filterVehiculos(value: any): any[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.placa.toLowerCase();
    return this.vehiculos.filter(vehiculo => vehiculo.placa.toLowerCase().includes(filterValue));
  }

  private _filterClientes(value: any): any[] {

    const filterValue = typeof value === 'string' ? value.toLowerCase() : (value.numeroIdentificacion || '').toLowerCase();

    return this.clientes.filter(cliente => {

      const numeroIdentificacion = cliente.numeroIdentificacion ? cliente.numeroIdentificacion.toString().toLowerCase() : '';
      return numeroIdentificacion.includes(filterValue);
    });
  }

  displayVehiculoFn(vehiculo: any): string {
    return vehiculo ? vehiculo.placa : '';
  }

  displayClienteFn(cliente: any): string {
    return cliente ? cliente.numeroIdentificacion : '';
  }

  guardarPlan(): void {
    if (this.PlanForm.valid) {
      this.planService.savePlan(this.PlanForm.value).subscribe(
        resp => {
          this._snackBar.open(resp.mensajes[0], '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
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

  cargarVehiculos() {
    this.vehiculoService.getAllVehiculos().subscribe(resp => {
      this.vehiculos = resp.datos;
    });
  }

  cargarCliente() {
    this.clienteService.getAllClientes().subscribe(resp => {
      this.clientes = resp.datos;
    });
  }

  crearVehiculo() {
    const dialogRef = this.dialog.open(CrearVehiculoComponent, {
      width: '700px',
      height: '600px',
      disableClose: true,
      data: { esDialogo: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarVehiculos();
    });
  }

  crearCliente() {
    const dialogRef = this.dialog.open(CrearClienteComponent, {
      width: '700px',
      disableClose: true,
      data: { esDialogo: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarCliente();
    });
  }
}