import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculosService } from '../services/vehiculos/vehiculos.service';
import { TipoVehiculoService } from '../services/tipoVehiculo/tipo-vehiculo.service';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert2';
import { EditarVehiculoComponent } from './editar-vehiculo/editar-vehiculo.component';

interface Vehiculo {
  id: any;
  tipoVehiculo: string;
  placa: string;
}

@Component({
  selector: 'app-lista-vehiculos',
  templateUrl: './lista-vehiculos.component.html',
  styleUrls: ['./lista-vehiculos.component.css']
})
export class ListaVehiculosComponent {

  vehiculos: Vehiculo[] = []
  displayedColumns: string[] = ['placa', 'tipoVehiculo', 'acciones'];
  dataSource: MatTableDataSource<Vehiculo> = new MatTableDataSource<Vehiculo>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public vehiculosServise: VehiculosService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ){

  }
  ngOnInit(): void {
    this.cargarVehiculos();
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

  cargarVehiculos() {
    this.vehiculosServise.getAllVehiculos().subscribe(resp => {
      this.vehiculos = resp.datos;
      this.dataSource.data = this.vehiculos;
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

  eliminarCliente(vehiculo: { id: any; }): void {
    swal({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar el vehiculo",
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
        this.vehiculosServise.deleteVehiculo(vehiculo.id).subscribe(resp => {
          const index = this.vehiculos.findIndex(e => e.id === vehiculo.id);
          if (index > -1) {
            this.vehiculos.splice(index, 1);
            this.dataSource.data = this.vehiculos;
            swal(
              'Vehiculo eliminado',
              'El Vehiculo ha sido eliminado con éxito',
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

  editarCliente(id: any) {
    const dialogRef = this.dialog.open(EditarVehiculoComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarVehiculos();
      }
    });
  } 

}
