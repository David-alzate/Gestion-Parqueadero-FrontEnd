import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { EmpleadosService } from '../services/empleados/empleados.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';

interface Empleado {
  id: any;
  nombre: string;
  apellido: string;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  estado: string;
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
  displayedColumns: string[] = ['nombre', 'apellido', 'tipoIdentificacion', 'numeroIdentificacion', 'estado', 'correoElectronico', 'tipoEmpleado', 'sede', 'acciones'];
  dataSource: MatTableDataSource<Empleado> = new MatTableDataSource<Empleado>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public empleadosService: EmpleadosService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
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

  eliminarEmpleado(empleado: { id: any; }): void {
    swal({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar al empleado",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true
    }).then((result) => {
      if (result.value) {
        this.empleadosService.deleteEmpleado(empleado.id).subscribe(resp => {
          const index = this.empleados.findIndex(e => e.id === empleado.id);
          if (index > -1) {
            this.empleados.splice(index, 1);
            this.dataSource.data = this.empleados;
            swal(
              'Empleado eliminado',
              'El empleado ha sido eliminado con éxito',
              'success'
            );
          }
        },
        error => {
          console.error(error);
        });
      }
    });
  }

  editarEmpleado(id: any) {
    const dialogRef = this.dialog.open(EditarEmpleadoComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarEmpleados();
      }
    });
  } 

}



