import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ParqueaderosService } from '../services/parqueaderos/parqueaderos.service';

interface Parqueadero {
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
    private cdr: ChangeDetectorRef
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

  eliminarParqueadero() {
    // Lógica para eliminar parqueadero
  }
}
