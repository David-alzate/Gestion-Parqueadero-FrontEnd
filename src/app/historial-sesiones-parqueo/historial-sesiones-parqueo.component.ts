import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SesionesParqueoService } from '../services/sesionParqueo/sesiones-parqueo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import swal from 'sweetalert2';
import { EditarSesionParqueoComponent } from './editar-sesion-parqueo/editar-sesion-parqueo.component';

interface SesionesParqueo {
  id: any;
  sede: string;
  placa: string;
  tipoVehiculo: string;
  empleado: string;
  estado: string;
  fechaHoraIngreso: string;
  fechaHoraSalida: string;
}

@Component({
  selector: 'app-historial-sesiones-parqueo',
  templateUrl: './historial-sesiones-parqueo.component.html',
  styleUrls: ['./historial-sesiones-parqueo.component.css']
})
export class HistorialSesionesParqueoComponent implements OnInit, AfterViewInit {

  sesiones: SesionesParqueo[] = [];
  displayedColumns: string[] = ['sede', 'placa', 'tipoVehiculo', 'empleado', 'estado', 'fechaHoraIngreso', 'fechaHoraSalida'];
  dataSource: MatTableDataSource<SesionesParqueo> = new MatTableDataSource<SesionesParqueo>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private sesionesParqueoService: SesionesParqueoService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.cargarSesiones()
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

  cargarSesiones() {
    this.sesionesParqueoService.getAllSesiones().subscribe(resp => {
      this.sesiones = resp.datos;
      this.dataSource.data = this.sesiones;
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

  eliminarSesion(sesion: { id: any; }): void {
    swal({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar la sesion de parqueo",
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
        this.sesionesParqueoService.deleteSesion(sesion.id).subscribe(resp => {
          const index = this.sesiones.findIndex(e => e.id === sesion.id);
          if (index > -1) {
            this.sesiones.splice(index, 1);
            this.dataSource.data = this.sesiones;
            swal(
              'Sesion de parqueo eliminada',
              'La sesion de parqueo ha sido eliminado con éxito',
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


  editarSesion(id: any) {
    const dialogRef = this.dialog.open(EditarSesionParqueoComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarSesiones();
      }
    });
  }

}
