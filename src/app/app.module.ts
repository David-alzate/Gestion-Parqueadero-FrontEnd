import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { UppercaseDirective } from './validators/uppercase.directive';
import { HistorialSesionesParqueoComponent } from './historial-sesiones-parqueo/historial-sesiones-parqueo.component';
import { EditarSesionParqueoComponent } from './historial-sesiones-parqueo/editar-sesion-parqueo/editar-sesion-parqueo.component';
import { SesionesActivasComponent } from './historial-sesiones-parqueo/sesiones-activas/sesiones-activas.component';
import { ListaPlanesActivosComponent } from './lista-planes/lista-planes-activos/lista-planes-activos.component';
import { CrearCeldasComponent } from './pg-admin/crear-celdas/crear-celdas.component';
import { ListaCeldasComponent } from './lista-celdas/lista-celdas.component';
import { EditarCeldaComponent } from './lista-celdas/editar-celda/editar-celda.component';
import { TarifasActivasComponent } from './lista-tarifas/tarifas-activas/tarifas-activas.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HistorialSesionesParqueoComponent,
    EditarSesionParqueoComponent,
    SesionesActivasComponent,
    ListaPlanesActivosComponent,
    CrearCeldasComponent,
    ListaCeldasComponent,
    EditarCeldaComponent,
    TarifasActivasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
