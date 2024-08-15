import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { EditarParqueaderoComponent } from 'src/app/lista-parqueadero/editar-parqueadero/editar-parqueadero.component';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { PlanesService } from 'src/app/services/planes/planes.service';
import { SedeService } from 'src/app/services/sede/sede.service';
import { TipoPlanesService } from 'src/app/services/tipoPlanes/tipo-planes.service';
import { VehiculosService } from 'src/app/services/vehiculos/vehiculos.service';

@Component({
  selector: 'app-editar-plan',
  templateUrl: './editar-plan.component.html',
  styleUrls: ['./editar-plan.component.css']
})
export class EditarPlanComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditarParqueaderoComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  PlanForm: FormGroup;
  id: any;
  sede: any;
  vehiculos: any[] = [];
  clientes: any[] = [];
  tipoPlan: any;
  plan: any[] = [];

  constructor(
    public fb: FormBuilder,
    public sedeService: SedeService,
    public vehiculoService: VehiculosService,
    public clienteService: ClientesService,
    public tipoPlanService: TipoPlanesService,
    public planService: PlanesService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.PlanForm = this.fb.group({
      sede: ['', Validators.required],
      vehiculo: ['', Validators.required],
      cliente: ['', Validators.required],
      tipoPlan: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
    });
    this.id = this.data.id.id;
  }

  ngOnInit(): void {

    this.sedeService.getAllSedes().subscribe(respSedes => {
      this.sede = respSedes.datos;

      this.vehiculoService.getAllVehiculos().subscribe(respVehiculo => {
        this.vehiculos = respVehiculo.datos;

        this.clienteService.getAllClientes().subscribe(respCliente => {
          this.clientes = respCliente.datos;

          this.tipoPlanService.getAllTipoPlanes().subscribe(respTipoPlan => {
            this.tipoPlan = respTipoPlan.datos;

            this.cargarDatosTarifa();

          }, respTipoPlan => {
            console.error(respTipoPlan);
          });

        }, respCliente => {
          console.error(respCliente);
        });

      }, respVehiculo => {
        console.error(respVehiculo);
      });

    }, respSedes => {
      console.error(respSedes);
    });

  }

  cargarDatosTarifa() {
    const sedeSeleccionado = this.data.id.sede;
    const vehiculoSeleccionado = this.data.id.vehiculo;
    const clienteSeleccionado = this.data.id.cliente;
    const tipoPlanSeleccionado = this.data.id.tipoPlan;

    const sede = this.sede.find((sede: { id: any; }) => sede.id === sedeSeleccionado.id);
    const vehiculo = this.vehiculos.find((vehiculo: { id: any; }) => vehiculo.id === vehiculoSeleccionado.id);
    const cliente = this.clientes.find((cliente: { id: any; }) => cliente.id === clienteSeleccionado.id);
    const tipoPlan = this.tipoPlan.find((tipoPlan: { id: any; }) => tipoPlan.id === tipoPlanSeleccionado.id);

    this.PlanForm.setValue({
      sede: sede,
      vehiculo: vehiculo,
      cliente: cliente,
      tipoPlan: tipoPlan,
      fechaInicio: this.data.id.fechaInicio,
      fechaFin: this.data.id.fechaFin,
    });
  }

  actualizarPlan() {
    if (this.PlanForm.valid) {
      const parqueaderoData = this.PlanForm.value;
      this.planService.updatePlan(this.id, parqueaderoData).subscribe(
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