import { Component, ViewChild } from '@angular/core';
import { SedeService } from '../services/sede/sede.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-lista-sede',
  templateUrl: './lista-sede.component.html',
  styleUrls: ['./lista-sede.component.css']
})
export class ListaSedeComponent {

  sedes: any[] = [];
  displayedColumns: string[] = ['nombreParqueadero', 'nombre', 'correo', 'tipoSede', 'pais', 'departamento', 'ciudad', 'direccion', 'celdasMoto', 
    'celdasCarro', 'celdasCamion', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public sedeService: SedeService
  ) {

  }

  ngOnInit(): void {
    this.sedeService.getAllSedes().subscribe(resp => {
      this.sedes = resp.datos
      this.dataSource = new MatTableDataSource(this.sedes);
    },
      error => { console.error(error) }
    );

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarSedes() {

  }
}