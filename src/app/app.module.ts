import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CrearParqueaderoComponent } from './crear-parqueadero/crear-parqueadero.component';
import { CrearSedeComponent } from './crear-sede/crear-sede.component';
import { ListaSedeComponent } from './lista-sede/lista-sede.component';
import { ListaParqueaderoComponent } from './lista-parqueadero/lista-parqueadero.component';
import { LoginComponent } from './login/login.component';
import { CrearEmpleadoComponent } from './crear-empleado/crear-empleado.component';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearParqueaderoComponent,
    CrearSedeComponent,
    ListaSedeComponent,
    ListaParqueaderoComponent,
    LoginComponent,
    CrearEmpleadoComponent,
    ListaEmpleadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }  
