import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearParqueaderoComponent } from './crear-parqueadero/crear-parqueadero.component';
import { CrearSedeComponent } from './crear-sede/crear-sede.component';
import { ListaSedeComponent } from './lista-sede/lista-sede.component';
import { ListaParqueaderoComponent } from './lista-parqueadero/lista-parqueadero.component';
import { LoginComponent } from './login/login.component';
import { CrearEmpleadoComponent } from './crear-empleado/crear-empleado.component';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/parqueadero', pathMatch: 'full' },
  { path: 'parqueadero', component: CrearParqueaderoComponent, canActivate: [AuthGuard] },
  { path: 'sede', component: CrearSedeComponent, canActivate: [AuthGuard] },
  { path: 'lista-sedes', component: ListaSedeComponent, canActivate: [AuthGuard] },
  { path: 'lista-parqueaderos', component: ListaParqueaderoComponent, canActivate: [AuthGuard] },
  { path: 'empleado', component: CrearEmpleadoComponent, canActivate: [AuthGuard] },
  { path: 'lista-empleados', component: ListaEmpleadosComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
