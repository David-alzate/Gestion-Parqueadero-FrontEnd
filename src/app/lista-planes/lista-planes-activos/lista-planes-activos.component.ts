import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import swal from 'sweetalert2';
import { EditarPlanComponent } from '../editar-plan/editar-plan.component';
import { PlanesService } from 'src/app/services/planes/planes.service';

interface Plan {
  id: any;
  sede: any;
  vehiculo: any;
  cliente: any;
  tipoPlan: any;
  estado: any;
  fechaInicio: any;
  fechaFin: any;
}

@Component({
  selector: 'app-lista-planes-activos',
  templateUrl: './lista-planes-activos.component.html',
  styleUrls: ['./lista-planes-activos.component.css']
})
export class ListaPlanesActivosComponent {

  planes: Plan[] = [];
  displayedColumns: string[] = ['sede', 'vehiculo', 'cliente', 'tipoPlan', 'estado', 'fechaInicio', 'fechaFin', 'acciones'];
  dataSource: MatTableDataSource<Plan> = new MatTableDataSource<Plan>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private planService: PlanesService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.cargarPlanes();
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

  cargarPlanes() {
    this.planService.getPlanesActivos().subscribe(resp => {
      this.planes = resp.datos;
      this.dataSource.data = this.planes;
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
      text: "Confirma si deseas eliminar el plan",
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
        this.planService.deletePlan(sede.id).subscribe(resp => {
          const index = this.planes.findIndex(e => e.id === sede.id);
          if (index > -1) {
            this.planes.splice(index, 1);
            this.dataSource.data = this.planes;
            swal(
              'Plan eliminado',
              'El Plan ha sido eliminado con éxito',
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
    const dialogRef = this.dialog.open(EditarPlanComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarPlanes();
      }
    });
  }

}
