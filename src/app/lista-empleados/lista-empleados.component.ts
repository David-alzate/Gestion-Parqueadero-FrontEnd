import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { EmpleadosService } from '../services/empleados/empleados.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface Empleado {
  nombre: string;
  apellido: string;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  correoElectronico: string;
  tipoEmpleado: string;
  sede: string;
}

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent{

  empleados: Empleado[] = []
  displayedColumns: string[] = ['nombre', 'apellido', 'tipoIdentificacion', 'numeroIdentificacion', 'correoElectronico', 'tipoEmpleado', 'sede', 'acciones'];
  dataSource: MatTableDataSource<Empleado> = new MatTableDataSource<Empleado>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public empleadosService: EmpleadosService,
    private cdr: ChangeDetectorRef
  ){

  }

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarEmpleados() {
    this.empleadosService.getAllEmpleados().subscribe(resp => {
      this.empleados = resp.datos;
      this.dataSource.data = this.empleados;
      this.cdr.detectChanges();
      if (this.paginator && this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.paginator._changePageSize(this.paginator.pageSize);
      }
    },
    error => {
      console.error(error);
    });
  }

}



