import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ParqueaderosService } from '../services/parqueaderos/parqueaderos.service';

@Component({
  selector: 'app-lista-parqueadero',
  templateUrl: './lista-parqueadero.component.html',
  styleUrls: ['./lista-parqueadero.component.css']
})
export class ListaParqueaderoComponent implements OnInit, AfterViewInit {

  parqueaderos: any[] = [];
  displayedColumns: string[] = ['nombre', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private parqueaderosService: ParqueaderosService
  ) {}

  ngOnInit(): void {
    this.cargarParqueaderos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarParqueaderos() {
    this.parqueaderosService.getAllParqueaderos().subscribe(resp => {
      this.parqueaderos = resp.datos;
      this.dataSource = new MatTableDataSource(this.parqueaderos);
    },
    error => {
      console.error(error);
    });
  }

  eliminarParqueadero(){

  }
}
