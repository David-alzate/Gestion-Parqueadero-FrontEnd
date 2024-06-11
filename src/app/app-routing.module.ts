import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearParqueaderoComponent } from './crear-parqueadero/crear-parqueadero.component';
import { CrearSedeComponent } from './crear-sede/crear-sede.component';
import { ListaSedeComponent } from './lista-sede/lista-sede.component';
import { ListaParqueaderoComponent } from './lista-parqueadero/lista-parqueadero.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/parqueadero', pathMatch: 'full' },
  { path: 'parqueadero', component: CrearParqueaderoComponent },
  { path: 'sede', component: CrearSedeComponent },
  { path: 'lista-sedes', component: ListaSedeComponent},
  { path: 'lista-parqueaderos', component: ListaParqueaderoComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
