import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrearParqueaderoComponent } from '../crear-parqueadero/crear-parqueadero.component';
import { CrearSedeComponent } from '../crear-sede/crear-sede.component';
import { ListaSedeComponent } from '../lista-sede/lista-sede.component';
import { ListaParqueaderoComponent } from '../lista-parqueadero/lista-parqueadero.component';
import { CrearEmpleadoComponent } from '../crear-empleado/crear-empleado.component';
import { ListaEmpleadosComponent } from '../lista-empleados/lista-empleados.component';
import { CrearTarifaComponent } from '../crear-tarifa/crear-tarifa.component';
import { ListaTarifasComponent } from '../lista-tarifas/lista-tarifas.component';
import { CrearClienteComponent } from '../crear-cliente/crear-cliente.component';
import { ListaClientesComponent } from '../lista-clientes/lista-clientes.component';
import { CrearVehiculoComponent } from '../crear-vehiculo/crear-vehiculo.component';
import { ListaVehiculosComponent } from '../lista-vehiculos/lista-vehiculos.component';
import { CrearPlanComponent } from '../crear-plan/crear-plan.component';
import { ListaPlanesComponent } from '../lista-planes/lista-planes.component';;
import { PgAdminComponent } from './pg-admin.component';
import { AdminGuard } from '../auth-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: PgAdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'parqueadero', component: CrearParqueaderoComponent },
      { path: 'sede', component: CrearSedeComponent },
      { path: 'lista-sedes', component: ListaSedeComponent },
      { path: 'lista-parqueaderos', component: ListaParqueaderoComponent },
      { path: 'empleado', component: CrearEmpleadoComponent },
      { path: 'lista-empleados', component: ListaEmpleadosComponent },
      { path: 'tarifa', component: CrearTarifaComponent },
      { path: 'lista-tarifas', component: ListaTarifasComponent },
      { path: 'cliente', component: CrearClienteComponent },
      { path: 'lista-clientes', component: ListaClientesComponent },
      { path: 'vehiculo', component: CrearVehiculoComponent },
      { path: 'lista-vehiculos', component: ListaVehiculosComponent },
      { path: 'planes', component: CrearPlanComponent },
      { path: 'lista-planes', component: ListaPlanesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PgAdminRoutingModule { }