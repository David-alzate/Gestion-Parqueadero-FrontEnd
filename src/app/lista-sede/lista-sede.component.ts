import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SedeService } from '../services/sede/sede.service';

interface Sede {
  nombreParqueadero: string;
  nombre: string;
  correo: string;
  tipoSede: string;
  pais: string;
  departamento: string;
  ciudad: string;
  direccion: string;
  celdasMoto: number;
  celdasCarro: number;
  celdasCamion: number;
}

@Component({
  selector: 'app-lista-sede',
  templateUrl: './lista-sede.component.html',
  styleUrls: ['./lista-sede.component.css']
})
export class ListaSedeComponent implements OnInit, AfterViewInit {

  sedes: Sede[] = [];
  displayedColumns: string[] = ['nombreParqueadero', 'nombre', 'correo', 'tipoSede', 'pais', 'departamento', 'ciudad', 'direccion', 'celdasMoto',
    'celdasCarro', 'celdasCamion', 'acciones'];
  dataSource: MatTableDataSource<Sede> = new MatTableDataSource<Sede>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private sedeService: SedeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarSedes();
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

  cargarSedes() {
    this.sedeService.getAllSedes().subscribe(resp => {
      this.sedes = resp.datos;
      this.dataSource.data = this.sedes;
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

  eliminarSedes() {
    // Lógica para eliminar sede
  }
}
