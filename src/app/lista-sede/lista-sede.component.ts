import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SedeService } from '../services/sede/sede.service';
import swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EditarSedeComponent } from './editar-sede/editar-sede.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Sede {
  id: any;
  nombreParqueadero: string;
  nombre: string;
  correo: string;
  tipoSede: string;
  pais: string;
  departamento: string;
  ciudad: string;
  direccion: string;
  celdasMoto: number;
  celdasCarro: number;
  celdasCamion: number;
}

@Component({
  selector: 'app-lista-sede',
  templateUrl: './lista-sede.component.html',
  styleUrls: ['./lista-sede.component.css']
})

export class ListaSedeComponent implements OnInit, AfterViewInit {

  sedes: Sede[] = [];
  displayedColumns: string[] = ['nombreParqueadero', 'nombre', 'correo', 'tipoSede', 'pais', 'departamento', 'ciudad', 'direccion', 'celdasMoto',
    'celdasCarro', 'celdasCamion', 'acciones'];
  dataSource: MatTableDataSource<Sede> = new MatTableDataSource<Sede>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private sedeService: SedeService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cargarSedes();
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

  cargarSedes() {
    this.sedeService.getAllSedes().subscribe(resp => {
      this.sedes = resp.datos;
      this.dataSource.data = this.sedes;
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

  eliminarSede(sede: { id: any; }): void {
    swal({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar la sede",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínala',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true
    }).then((result) => {
      if (result.value) {
        this.sedeService.deleteSede(sede.id).subscribe(resp => {
          const index = this.sedes.findIndex(e => e.id === sede.id);
          if (index > -1) {
            this.sedes.splice(index, 1);
            this.dataSource.data = this.sedes;
            swal(
              'Sede eliminado',
              'La Sede ha sido eliminado con éxito',
              'success'
            );
          }
        },
          error => {
            this._snackBar.open(error.error.mensajes[0], '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          });
      }
    });
  }

  editarSede(id: any) {
    const dialogRef = this.dialog.open(EditarSedeComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarSedes();
      }
    });
  }
}
