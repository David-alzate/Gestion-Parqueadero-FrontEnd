import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TarifasService } from '../../services/tarifas/tarifas.service';
import { MatDialog } from '@angular/material/dialog';

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
  selector: 'app-tarifas-activas',
  templateUrl: './tarifas-activas.component.html',
  styleUrls: ['./tarifas-activas.component.css']
})
export class TarifasActivasComponent {

  tarifas: Tarifa[] = []
  displayedColumns: string[] = ['sede', 'tipoVehiculo', 'tipoTarifa', 'tarifa', 'estado', 'fechaInicioVigencia', 'fechaFinVigencia'];
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

}
