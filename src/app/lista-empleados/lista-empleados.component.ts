import { Component } from '@angular/core';
import { EmpleadosService } from '../services/empleados/empleados.service';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent{

  empleados: any[] = []

  constructor(
    public empleadosService: EmpleadosService
  ){

  }

  ngOnInit(): void {


    this.empleadosService.getAllEmpleados().subscribe(resp => {
      this.empleados = resp.datos
    },
      error => { console.error(error) }
    );

  }

}



