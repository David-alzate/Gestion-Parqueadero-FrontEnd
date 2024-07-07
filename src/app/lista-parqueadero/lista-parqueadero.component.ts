import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ParqueaderosService } from '../services/parqueaderos/parqueaderos.service';
import swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EditarParqueaderoComponent } from './editar-parqueadero/editar-parqueadero.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Parqueadero {
  id: any;
  nombre: string;
}

@Component({
  selector: 'app-lista-parqueadero',
  templateUrl: './lista-parqueadero.component.html',
  styleUrls: ['./lista-parqueadero.component.css']
})
export class ListaParqueaderoComponent implements OnInit, AfterViewInit {

  parqueaderos: Parqueadero[] = [];
  displayedColumns: string[] = ['nombre', 'acciones'];
  dataSource: MatTableDataSource<Parqueadero> = new MatTableDataSource<Parqueadero>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private parqueaderosService: ParqueaderosService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarParqueaderos();
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

  cargarParqueaderos() {
    this.parqueaderosService.getAllParqueaderos().subscribe(resp => {
      this.parqueaderos = resp.datos;
      this.dataSource.data = this.parqueaderos;
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

  eliminarParqueadero(parqueadero: { id: any; }): void {
    swal({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar al parqueadero",
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
        this.parqueaderosService.deleteParqueadero(parqueadero.id).subscribe(resp => {
          const index = this.parqueaderos.findIndex(e => e.id === parqueadero.id);
          if (index > -1) {
            this.parqueaderos.splice(index, 1);
            this.dataSource.data = this.parqueaderos;
            swal(
              'Parqueadero eliminado',
              'El parqueadero ha sido eliminado con éxito',
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

  editarParqueadero(id: any) {
    const dialogRef = this.dialog.open(EditarParqueaderoComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarParqueaderos();
      }
    });
  } 
}
