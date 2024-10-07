import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CeldasService } from '../services/celdas/celdas.service';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert2';
import { EditarCeldaComponent } from './editar-celda/editar-celda.component';

interface Celda {
  id: any;
  sede: string;
  tipoVehiculo: string;
  cantidadCeldas: string;
}

@Component({
  selector: 'app-lista-celdas',
  templateUrl: './lista-celdas.component.html',
  styleUrls: ['./lista-celdas.component.css']
})
export class ListaCeldasComponent implements OnInit {

  Celdas: Celda[] = []
  displayedColumns: string[] = ['sede', 'tipoVehiculo', 'cantidadCeldas', 'acciones'];
  dataSource: MatTableDataSource<Celda> = new MatTableDataSource<Celda>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public celdasService: CeldasService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.cargarCeldas();
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

  cargarCeldas() {
    this.celdasService.getAllCeldas().subscribe(resp => {
      this.Celdas = resp.datos;
      this.dataSource.data = this.Celdas;
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


  eliminarCelda(cliente: { id: any; }): void {
    swal({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar las celdas",
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
        this.celdasService.deleteCelda(cliente.id).subscribe(resp => {
          const index = this.Celdas.findIndex(e => e.id === cliente.id);
          if (index > -1) {
            this.Celdas.splice(index, 1);
            this.dataSource.data = this.Celdas;
            swal(
              'Celdas eliminado',
              'Las celdas ha sido eliminado con éxito',
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

  editarCelda(id: any) {
    const dialogRef = this.dialog.open(EditarCeldaComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarCeldas();
      }
    });
  }

}
