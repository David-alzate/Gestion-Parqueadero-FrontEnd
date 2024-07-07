import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearParqueaderoComponent } from './crear-parqueadero/crear-parqueadero.component';
import { CrearSedeComponent } from './crear-sede/crear-sede.component';
import { ListaSedeComponent } from './lista-sede/lista-sede.component';
import { ListaParqueaderoComponent } from './lista-parqueadero/lista-parqueadero.component';
import { LoginComponent } from './login/login.component';
import { CrearEmpleadoComponent } from './crear-empleado/crear-empleado.component';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';
import { CrearTarifaComponent } from './crear-tarifa/crear-tarifa.component';

// Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ListaTarifasComponent } from './lista-tarifas/lista-tarifas.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EditarParqueaderoComponent } from './lista-parqueadero/editar-parqueadero/editar-parqueadero.component';
import { EditarSedeComponent } from './lista-sede/editar-sede/editar-sede.component';


@NgModule({
  declarations: [
    AppComponent,
    CrearParqueaderoComponent,
    CrearSedeComponent,
    ListaSedeComponent,
    ListaParqueaderoComponent,
    LoginComponent,
    CrearEmpleadoComponent,
    ListaEmpleadosComponent,
    CrearTarifaComponent,
    ListaTarifasComponent,
    EditarParqueaderoComponent,
    EditarSedeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
