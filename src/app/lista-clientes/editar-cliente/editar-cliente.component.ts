import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditarParqueaderoComponent } from 'src/app/lista-parqueadero/editar-parqueadero/editar-parqueadero.component';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { TipoIdentificacionService } from 'src/app/services/tipoIdentificacion/tipo-identificacion.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditarParqueaderoComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  ClienteForm: FormGroup;
  id: any;
  tipoIdentificacion: any;
  cliente: any[] = [];

  constructor(
    public fb: FormBuilder,
    public clienteService: ClientesService,
    public tipoIdentificacionService: TipoIdentificacionService,
    private _snackBar: MatSnackBar
  ) {
    this.ClienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],
      numeroIdentificacion: ['', Validators.required],
      correoElectronico: ['', Validators.required],
    });
    this.id = this.data.id.id;
  }
  ngOnInit(): void {
    this.tipoIdentificacionService.getAllTipoIdentificaciones().subscribe(resp => {
      this.tipoIdentificacion = resp.datos

      this.cargarDatosCliente();
    },
      error => { console.error(error) }
    );
  }

  cargarDatosCliente() {
    const TipoIdentificacionSeleccionado = this.data.id.tipoIdentificacion;

    const tipoIdentificacion = this.tipoIdentificacion.find((tipoIdentificacion: { id: any; }) => tipoIdentificacion.id === TipoIdentificacionSeleccionado.id);

    this.ClienteForm.setValue({
      nombre: this.data.id.nombre,
      apellido: this.data.id.apellido,
      tipoIdentificacion: tipoIdentificacion,
      numeroIdentificacion: this.data.id.numeroIdentificacion,
      correoElectronico: this.data.id.correoElectronico,
    });
  }

  actualizarCliente() {
    if (this.ClienteForm.valid) {
      const parqueaderoData = this.ClienteForm.value;
      this.clienteService.updateCliente(this.id, parqueaderoData).subscribe(
        (response) => {
          this._snackBar.open(response.mensajes[0], '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
          this.dialogRef.close(true);
        },
        (error) => {
          this._snackBar.open(error.error.mensajes[0], '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      );
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
