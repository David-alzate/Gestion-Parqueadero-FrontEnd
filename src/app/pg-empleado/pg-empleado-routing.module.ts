import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgEmpleadoComponent } from './pg-empleado.component';
import { IngresoVehiculoComponent } from './ingreso-vehiculo/ingreso-vehiculo.component';
import { EmployeeGuard } from '../auth-empleado.guard';
import { HistorialSesionesParqueoComponent } from '../historial-sesiones-parqueo/historial-sesiones-parqueo.component';
import { SesionesActivasComponent } from '../historial-sesiones-parqueo/sesiones-activas/sesiones-activas.component';

const routes: Routes = [
  {
    path: '',
    component: PgEmpleadoComponent,
    canActivate: [EmployeeGuard],
    children: [
      { path: 'ingreso-vehiculo', component: IngresoVehiculoComponent },
      { path: 'historial-sesiones-parqueo', component: HistorialSesionesParqueoComponent },
      { path: 'sesiones-parqueo-activas', component: SesionesActivasComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PgEmpleadoRoutingModule { }
