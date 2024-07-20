import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgEmpleadoComponent } from './pg-empleado.component';
import { IngresoVehiculoComponent } from './ingreso-vehiculo/ingreso-vehiculo.component';
import { EmployeeGuard } from '../auth-empleado.guard';

const routes: Routes = [
  {
    path: '',
    component: PgEmpleadoComponent,
    canActivate: [EmployeeGuard],
    children: [
      { path: 'ingreso-vehiculo', component: IngresoVehiculoComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PgEmpleadoRoutingModule { }
