import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientesService } from '../services/clientes/clientes.service';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert2';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';

interface Cliente {
  id: any;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  nombre: string;
  apellido: string;
  correoElectronico: string;
}

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit{

  clientes: Cliente[] = []
  displayedColumns: string[] = ['nombre', 'apellido', 'tipoIdentificacion', 'numeroIdentificacion', 'correoElectronico', 'acciones'];
  dataSource: MatTableDataSource<Cliente> = new MatTableDataSource<Cliente>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 
  constructor(
    public clientesService: ClientesService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ){

  }
  ngOnInit(): void {
    this.cargarClientes();
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

  cargarClientes() {
    this.clientesService.getAllClientes().subscribe(resp => {
      this.clientes = resp.datos;
      this.dataSource.data = this.clientes;
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

  eliminarCliente(cliente: { id: any; }): void {
    swal({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar al cliente",
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
        this.clientesService.deleteCliente(cliente.id).subscribe(resp => {
          const index = this.clientes.findIndex(e => e.id === cliente.id);
          if (index > -1) {
            this.clientes.splice(index, 1);
            this.dataSource.data = this.clientes;
            swal(
              'cliente eliminado',
              'El cliente ha sido eliminado con éxito',
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
    const dialogRef = this.dialog.open(EditarClienteComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarClientes();
      }
    });
  } 
}
