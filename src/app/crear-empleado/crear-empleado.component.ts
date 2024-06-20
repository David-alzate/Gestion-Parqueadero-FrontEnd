import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadosService } from '../services/empleados/empleados.service';
import { TipoIdentificacionService } from '../services/tipoIdentificacion/tipo-identificacion.service';
import { TipoEmpleadosService } from '../services/tipoEmpleados/tipo-empleados.service';
import { SedeService } from '../services/sede/sede.service';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {

  EmpleadoForm: FormGroup;
  tipoIdentificacion: any;
  tipoEmpleado: any;
  sede: any;
  empleado: any[] = [];

  constructor(
    public fb: FormBuilder,
    public empleadoService: EmpleadosService,
    public tipoIdentificacionService: TipoIdentificacionService,
    public tipoEmpleadoService: TipoEmpleadosService,
    public sedeService: SedeService
  ) {
    this.EmpleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],
      numeroIdentificacion: ['', Validators.required],
      correoElectronico: ['', Validators.required],
      tipoEmpleado: ['', Validators.required],
      sede: ['', Validators.required],
      password: ['', Validators.required],

    });

  }


  ngOnInit(): void {

    this.tipoIdentificacionService.getAllTipoIdentificaciones().subscribe(resp => {
      this.tipoIdentificacion = resp.datos
    },
      error => { console.error(error) }
    );

    this.tipoEmpleadoService.getAllTipoEmpleados().subscribe(resp => {
      this.tipoEmpleado = resp.datos
    },
      error => { console.error(error) }
    );

    this.sedeService.getAllSedes().subscribe(resp => {
      this.sede = resp.datos
    },
      error => { console.error(error) }
    );

  }


  guardarEmpleado(): void {
    if (this.EmpleadoForm.valid) {
      this.empleadoService.saveEmpleado(this.EmpleadoForm.value).subscribe(
        resp => {
          alert(resp.mensajes[0]);
          this.EmpleadoForm.reset();
          this.empleado.push(resp);
          console.log(resp);
        },
        error => {
          console.error(error);
          alert(error.error.mensajes[0]);
        }
      );
    } else {
      alert('Formulario inválido. Por favor, completa todos los campos requeridos.');
    }
  }

}
