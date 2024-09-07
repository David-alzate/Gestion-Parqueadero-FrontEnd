import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditarParqueaderoComponent } from 'src/app/lista-parqueadero/editar-parqueadero/editar-parqueadero.component';
import { CiudadesService } from 'src/app/services/ciudades/ciudaes.service';
import { DepartamentosService } from 'src/app/services/departamentos/departamentos.service';
import { PaisesService } from 'src/app/services/paises/paises.service';
import { ParqueaderosService } from 'src/app/services/parqueaderos/parqueaderos.service';
import { SedeService } from 'src/app/services/sede/sede.service';
import { TipoSedeService } from 'src/app/services/tipoSede/tipo-sede.service';

@Component({
  selector: 'app-editar-sede',
  templateUrl: './editar-sede.component.html',
  styleUrls: ['./editar-sede.component.css']
})
export class EditarSedeComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditarParqueaderoComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  sedeForm: FormGroup;
  id: any;
  paises: any;
  departamentos: any;
  parqueaderos: any;
  tipoSedes: any;
  ciudades: any;
  sede: any[] = [];

  constructor(
    public fb: FormBuilder,
    public sedeService: SedeService,
    public paisesService: PaisesService,
    public departamentosService: DepartamentosService,
    public parqueaderosService: ParqueaderosService,
    public tipoSedeService: TipoSedeService,
    public ciudadesService: CiudadesService,
    private _snackBar: MatSnackBar
  ) {
    this.sedeForm = this.fb.group({
      parqueadero: ['', Validators.required],
      nombre: ['', Validators.required],
      correoElectronico: ['', Validators.required],
      tipoSede: ['', Validators.required],
      pais: ['', Validators.required],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
    });
    this.id = this.data.id.id;
  }

  ngOnInit(): void {

    this.parqueaderosService.getAllParqueaderos().subscribe(
      (respParqueaderos) => {
        this.parqueaderos = respParqueaderos.datos;

        this.tipoSedeService.getAllTipoSedes().subscribe(
          (respTipoSedes) => {
            this.tipoSedes = respTipoSedes.datos;

            this.paisesService.getAllPaises().subscribe(
              (respPaises) => {
                this.paises = respPaises.datos;

                this.cargarDatosSede();

                this.sedeForm.get('pais')?.valueChanges.subscribe((value) => {
                  if (value !== null) {
                    this.departamentosService
                      .getAllDepartamentosByPais(value.id)
                      .subscribe(
                        (respDepartamentos) => {
                          this.departamentos = respDepartamentos.datos;
                        },
                        (errorDepartamentos) => {
                          console.error(errorDepartamentos);
                        }
                      );
                  }
                });


                this.sedeForm.get('departamento')?.valueChanges.subscribe((value) => {
                  if (value !== null) {
                    this.ciudadesService.getAllCiudadesByDepartamento(value.id).subscribe(
                      (respCiudades) => {
                        this.ciudades = respCiudades.datos;
                      },
                      (errorCiudades) => {
                        console.error(errorCiudades);
                      }
                    );
                  }
                });
              },
              (errorPaises) => {
                console.error(errorPaises);
              }
            );
          },
          (errorTipoSedes) => {
            console.error(errorTipoSedes);
          }
        );
      },
      (errorParqueaderos) => {
        console.error(errorParqueaderos);
      }
    );
  }


  cargarDatosSede() {
    const parqueaderoSeleccionado = this.data.id.parqueadero;
    const tipoSedeSeleccionado = this.data.id.tipoSede;

    const parqueadero = this.parqueaderos.find((p: any) => p.id === parqueaderoSeleccionado.id);
    const tipoSede = this.tipoSedes.find((t: any) => t.id === tipoSedeSeleccionado.id);
    const pais = this.paises.find((pais: any) => pais.id === this.data.id.pais.id);

    this.sedeForm.patchValue({
      parqueadero: parqueadero,
      nombre: this.data.id.nombre,
      correoElectronico: this.data.id.correoElectronico,
      tipoSede: tipoSede,
      pais: pais,
      direccion: this.data.id.direccion,
    });

    this.departamentosService.getAllDepartamentosByPais(pais.id).subscribe(
      respDepartamentos => {
        this.departamentos = respDepartamentos.datos;

        const departamento = this.departamentos.find((d: any) => d.id === this.data.id.departamento.id);

        if (departamento) {
          this.sedeForm.get('departamento')?.setValue(departamento);
        } else {
          console.error('No se encontró el departamento correspondiente en la lista.');
        }

        this.ciudadesService.getAllCiudadesByDepartamento(departamento.id).subscribe(
          respCiudades => {
            this.ciudades = respCiudades.datos;

            const ciudad = this.ciudades.find((c: any) => c.id === this.data.id.ciudad.id);

            if (ciudad) {
              this.sedeForm.get('ciudad')?.setValue(ciudad);
            } else {
              console.error('No se encontró la ciudad correspondiente en la lista.');
            }
          },
          errorCiudades => {
            console.error(errorCiudades);
          }
        );
      },
      errorDepartamentos => {
        console.error(errorDepartamentos);
      }
    );
  }



  actualizarSede() {
    if (this.sedeForm.valid) {
      const parqueaderoData = this.sedeForm.value;
      this.sedeService.updateSede(this.id, parqueaderoData).subscribe(
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
