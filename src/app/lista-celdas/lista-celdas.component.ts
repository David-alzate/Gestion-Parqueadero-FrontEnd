import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CeldasService } from '../services/celdas.service';
import { MatDialog } from '@angular/material/dialog';

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


  eliminarCelda(id: any) {

  }

  editarCelda(id: any) {

  }

}
