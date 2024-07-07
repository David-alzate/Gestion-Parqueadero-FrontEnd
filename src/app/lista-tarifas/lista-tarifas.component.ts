import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TarifasService } from '../services/tarifas/tarifas.service';
import swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EditarTarifaComponent } from './editar-tarifa/editar-tarifa.component';

interface Tarifa {
  id: any;
  sede: string;
  tipoVehiculo: string;
  tipoTarifa: string;
  tarifa: number;
  estado: string;
  fechaInicioVigencia: string;
  fechaFinVigencia: string;
}

@Component({
  selector: 'app-lista-tarifas',
  templateUrl: './lista-tarifas.component.html',
  styleUrls: ['./lista-tarifas.component.css']
})
export class ListaTarifasComponent implements OnInit{

  tarifas: Tarifa[] = []
  displayedColumns: string[] = ['sede', 'tipoVehiculo', 'tipoTarifa', 'tarifa', 'estado', 'fechaInicioVigencia', 'fechaFinVigencia', 'acciones'];
  dataSource: MatTableDataSource<Tarifa> = new MatTableDataSource<Tarifa>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public tarifasService: TarifasService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.cargarTarifas();
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

  cargarTarifas() {
    this.tarifasService.getAllTarifas().subscribe(resp => {
      this.tarifas = resp.datos;
      this.dataSource.data = this.tarifas;
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

  eliminarTarifa(tarifa: { id: any; }): void {
    swal({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar la Tarifa",
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
        this.tarifasService.deleteTarifa(tarifa.id).subscribe(resp => {
          const index = this.tarifas.findIndex(e => e.id === tarifa.id);
          if (index > -1) {
            this.tarifas.splice(index, 1);
            this.dataSource.data = this.tarifas;
            swal(
              'Tarifa eliminado',
              'La Tarifa ha sido eliminado con éxito',
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

  
  editarTarifa(id: any) {
    const dialogRef = this.dialog.open(EditarTarifaComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarTarifas();
      }
    });
  } 


}
