import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgEmpleadoComponent } from './pg-empleado.component';
import { IngresoVehiculoComponent } from './ingreso-vehiculo/ingreso-vehiculo.component';
import { EmployeeGuard } from '../auth-empleado.guard';
import { HistorialSesionesParqueoComponent } from '../historial-sesiones-parqueo/historial-sesiones-parqueo.component';
import { SesionesActivasComponent } from '../historial-sesiones-parqueo/sesiones-activas/sesiones-activas.component';
import { CrearPlanComponent } from '../crear-plan/crear-plan.component';
import { ListaPlanesComponent } from '../lista-planes/lista-planes.component';
import { SalidaVehiculoComponent } from './salida-vehiculo/salida-vehiculo.component';
import { ListaPlanesActivosComponent } from '../lista-planes/lista-planes-activos/lista-planes-activos.component';
import { TarifasActivasComponent } from '../lista-tarifas/tarifas-activas/tarifas-activas.component';

const routes: Routes = [
  {
    path: '',
    component: PgEmpleadoComponent,
    canActivate: [EmployeeGuard],
    children: [
      { path: 'ingreso-vehiculo', component: IngresoVehiculoComponent },
      { path: 'historial-sesiones-parqueo', component: HistorialSesionesParqueoComponent },
      { path: 'sesiones-parqueo-activas', component: SesionesActivasComponent },
      { path: 'crear-plan', component: CrearPlanComponent },
      { path: 'lista-plan', component: ListaPlanesComponent },
      { path: 'lista-plan-activos', component: ListaPlanesActivosComponent },
      { path: 'salida-vehiculo', component: SalidaVehiculoComponent },
      { path: 'tarifas-activas', component: TarifasActivasComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PgEmpleadoRoutingModule { }
