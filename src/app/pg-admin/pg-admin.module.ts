import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PgAdminRoutingModule } from './pg-admin-routing.module';
import { PgAdminComponent } from './pg-admin.component';
import { NavBarAdminComponent } from './nav-bar-admin/nav-bar-admin.component';
import { SharedModule } from '../shared/shared.module';

import { CrearParqueaderoComponent } from './crear-parqueadero/crear-parqueadero.component';
import { CrearSedeComponent } from './crear-sede/crear-sede.component';
import { ListaSedeComponent } from '../lista-sede/lista-sede.component';
import { ListaParqueaderoComponent } from '../lista-parqueadero/lista-parqueadero.component';
import { CrearEmpleadoComponent } from './crear-empleado/crear-empleado.component';
import { ListaEmpleadosComponent } from '../lista-empleados/lista-empleados.component';
import { CrearTarifaComponent } from './crear-tarifa/crear-tarifa.component';
import { ListaTarifasComponent } from '../lista-tarifas/lista-tarifas.component';
import { CrearClienteComponent } from '../crear-cliente/crear-cliente.component';
import { ListaClientesComponent } from '../lista-clientes/lista-clientes.component';
import { CrearVehiculoComponent } from '../crear-vehiculo/crear-vehiculo.component';
import { ListaVehiculosComponent } from '../lista-vehiculos/lista-vehiculos.component';
import { CrearPlanComponent } from '../crear-plan/crear-plan.component';
import { ListaPlanesComponent } from '../lista-planes/lista-planes.component';
import { EditarVehiculoComponent } from '../lista-vehiculos/editar-vehiculo/editar-vehiculo.component';
import { EditarPlanComponent } from '../lista-planes/editar-plan/editar-plan.component';
import { EditarTarifaComponent } from '../lista-tarifas/editar-tarifa/editar-tarifa.component';
import { EditarSedeComponent } from '../lista-sede/editar-sede/editar-sede.component';
import { EditarParqueaderoComponent } from '../lista-parqueadero/editar-parqueadero/editar-parqueadero.component';
import { EditarEmpleadoComponent } from '../lista-empleados/editar-empleado/editar-empleado.component';
import { EditarClienteComponent } from '../lista-clientes/editar-cliente/editar-cliente.component';
import { RouterModule } from '@angular/router';
import { UppercaseDirective } from '../validators/uppercase.directive';



@NgModule({
  declarations: [
    PgAdminComponent,
    NavBarAdminComponent,
    CrearParqueaderoComponent,
    CrearSedeComponent,
    ListaSedeComponent,
    ListaParqueaderoComponent,
    CrearEmpleadoComponent,
    ListaEmpleadosComponent,
    CrearTarifaComponent,
    ListaTarifasComponent,
    CrearClienteComponent,
    ListaClientesComponent,
    CrearVehiculoComponent,
    ListaVehiculosComponent,
    EditarVehiculoComponent,
    CrearPlanComponent,
    ListaPlanesComponent,
    EditarPlanComponent,
    EditarTarifaComponent,
    EditarSedeComponent,
    EditarParqueaderoComponent,
    EditarEmpleadoComponent,
    EditarClienteComponent,
  ],
  imports: [
    CommonModule,
    PgAdminRoutingModule,
    RouterModule,
    SharedModule
  ]
})
export class PgAdminModule { }