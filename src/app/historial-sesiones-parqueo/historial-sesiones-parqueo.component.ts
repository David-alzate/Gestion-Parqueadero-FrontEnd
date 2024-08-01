import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SesionesParqueoService } from '../services/sesionParqueo/sesiones-parqueo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

interface SesionesParqueo {
  id: any;
  sede: string;
  placa: string;
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
  displayedColumns: string[] = ['sede', 'placa', 'empleado', 'estado', 'fechaHoraIngreso', 'fechaHoraSalida', 'acciones'];
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

  eliminarSesion(sede: { id: any; }): void {
  }


  editarSesion(id: any) {
  }

}
