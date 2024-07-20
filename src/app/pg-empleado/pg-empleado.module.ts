import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PgEmpleadoRoutingModule } from './pg-empleado-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NavBarEmpleadoComponent } from './nav-bar-empleado/nav-bar-empleado.component';
import { PgEmpleadoComponent } from './pg-empleado.component';
import { IngresoVehiculoComponent } from './ingreso-vehiculo/ingreso-vehiculo.component';



@NgModule({
  declarations: [
    NavBarEmpleadoComponent,
    PgEmpleadoComponent,
    IngresoVehiculoComponent
  ],
  imports: [
    CommonModule,
    PgEmpleadoRoutingModule,
    SharedModule
  ]
})
export class PgEmpleadoModule { }
