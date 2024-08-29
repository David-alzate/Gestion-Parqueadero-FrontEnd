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
import { ListaPlanesActivosComponent } from '../lista-planes/lista-planes-activos/lista-planes-activos.component';
import { HistorialSesionesParqueoComponent } from '../historial-sesiones-parqueo/historial-sesiones-parqueo.component';
import { SesionesActivasComponent } from '../historial-sesiones-parqueo/sesiones-activas/sesiones-activas.component';
import { CrearCeldasComponent } from '../crear-celdas/crear-celdas.component';
import { ListaCeldasComponent } from '../lista-celdas/lista-celdas.component';

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
      { path: 'lista-planes', component: ListaPlanesComponent },
      { path: 'lista-planes-activos', component: ListaPlanesActivosComponent },
      { path: 'historial-sesiones-parqueo', component: HistorialSesionesParqueoComponent },
      { path: 'sesiones-parqueo-activas', component: SesionesActivasComponent },
      { path: 'crear-celdas', component: CrearCeldasComponent },
      { path: 'lista-celdas', component: ListaCeldasComponent }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PgAdminRoutingModule { }