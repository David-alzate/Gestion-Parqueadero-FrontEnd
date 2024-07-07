import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParqueaderosService } from 'src/app/services/parqueaderos/parqueaderos.service';

@Component({
  selector: 'app-editar-parqueadero',
  templateUrl: './editar-parqueadero.component.html',
  styleUrls: ['./editar-parqueadero.component.css']
})
export class EditarParqueaderoComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditarParqueaderoComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);


  ParqueaderoForm: FormGroup;
  Parqueadero: any[] = [];
  id: any;

  constructor(
    public fb: FormBuilder,
    public ParqueaderosService: ParqueaderosService,
    private _snackBar: MatSnackBar
  ) {
    this.ParqueaderoForm = this.fb.group({
      nombre: ['', Validators.required],
    });
    this.id = this.data.id.id;
  }

  ngOnInit(): void {
    this.cargarDatosParqueadero();
  }

  cancelar() {
    this.dialogRef.close();
  }
  cargarDatosParqueadero() {
    this.ParqueaderoForm.setValue({
      nombre: this.data.id.nombre
    })
  }

  actualizarParqueadero() {
    if (this.ParqueaderoForm.valid) {
      const parqueaderoData = this.ParqueaderoForm.value;
      this.ParqueaderosService.updateParqueadero(this.id, parqueaderoData).subscribe(
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

} 
