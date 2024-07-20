import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./pg-admin/pg-admin.module').then(m => m.PgAdminModule) 
  },
  { 
    path: 'empleado', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./pg-empleado/pg-empleado.module').then(m => m.PgEmpleadoModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }