import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParqueaderosService } from '../services/parqueaderos/parqueaderos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-parqueadero',
  templateUrl: './crear-parqueadero.component.html',
  styleUrls: ['./crear-parqueadero.component.css']
})
export class CrearParqueaderoComponent {

  ParqueaderoForm: FormGroup;
  Parqueadero: any[] = [];

  constructor(
    public fb: FormBuilder,
    public ParqueaderosService: ParqueaderosService,
    private _snackBar: MatSnackBar
  ) {
    this.ParqueaderoForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  guardarParqueadero(): void {
    this.ParqueaderosService.saveParqueadero(this.ParqueaderoForm.value).subscribe(resp => {
      this._snackBar.open(resp.mensajes[0], '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      })
      this.ParqueaderoForm.reset();
      this.Parqueadero.push(resp);
    },
      error => {
        console.error(error);
        this._snackBar.open(error.error.mensajes[0], '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }

    );
  }

}
