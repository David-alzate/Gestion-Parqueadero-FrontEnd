import { Component, Inject, OnInit, Optional } from '@angular/core';
import { TipoIdentificacionService } from '../services/tipoIdentificacion/tipo-identificacion.service';
import { ClientesService } from '../services/clientes/clientes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  ClienteForm: FormGroup;
  tipoIdentificacion: any;
  cliente: any[] = [];
  esDialogo: boolean = false;

  constructor(
    public fb: FormBuilder,
    public clienteService: ClientesService,
    public tipoIdentificacionService: TipoIdentificacionService,
    private _snackBar: MatSnackBar,
    @Optional() public dialogRef: MatDialogRef<CrearClienteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.ClienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],
      numeroIdentificacion: ['', Validators.required],
      correoElectronico: ['', Validators.required],
    });

    if (data && data.esDialogo) {
      this.esDialogo = true;
    }
  }
  ngOnInit(): void {
    this.tipoIdentificacionService.getAllTipoIdentificaciones().subscribe(resp => {
      this.tipoIdentificacion = resp.datos
    },
      error => { console.error(error) }
    );
  }


  guardarCliente(): void {
    if (this.ClienteForm.valid) {
      this.clienteService.saveCliente(this.ClienteForm.value).subscribe(
        resp => {
          this._snackBar.open(resp.mensajes[0], '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
          this.ClienteForm.reset();
          this.cliente.push(resp);
          console.log(resp);

          if (this.esDialogo && this.dialogRef) {
            this.dialogRef.close();
          }
        },
        error => {
          console.error(error);
          this._snackBar.open(error.error.mensajes[0], '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
        }
      );
    } else {
      this._snackBar.open('Formulario inválido. Por favor, completa todos los campos requeridos.', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      })
    }
  }

  cerrarDialogo() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

}
