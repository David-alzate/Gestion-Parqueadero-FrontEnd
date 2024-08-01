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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HistorialSesionesParqueoComponent
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
