import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SedeService } from '../services/sede/sede.service';
import { PaisesService } from '../services/paises/paises.service';
import { DepartamentosService } from '../services/departamentos/departamentos.service';
import { ParqueaderosService } from '../services/parqueaderos/parqueaderos.service';
import { TipoSedeService } from '../services/tipoSede/tipo-sede.service';
import { CiudadesService } from '../services/ciudades/ciudaes.service';


@Component({
  selector: 'app-root',
  templateUrl: './crear-sede.component.html',
  styleUrls: ['./crear-sede.component.css']
})
export class CrearSedeComponent implements OnInit {

  sedeForm: FormGroup;
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
    public ciudadesService: CiudadesService
  ){
    this.sedeForm = this.fb.group({
      parqueadero: ['', Validators.required],
      nombre: ['', Validators.required],
      correoElectronico: ['', Validators.required],
      tipoSede: ['', Validators.required],
      pais: ['', Validators.required],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      celdasCarro: ['', Validators.required],
      celdasMoto: ['', Validators.required],
      celdascamion: ['', Validators.required],
    });

  }

  ngOnInit(): void {

    this.paisesService.getAllPaises().subscribe(resp => {
      this.paises = resp.datos
    },
      error => { console.error(error) }
    );

    this.parqueaderosService.getAllParqueaderos().subscribe(resp => {
      this.parqueaderos = resp.datos
    },
      error => { console.error(error) }
    );

    this.tipoSedeService.getAllTipoSedes().subscribe(resp => {
      this.tipoSedes = resp.datos
    },
      error => { console.error(error) }
    );
    

    this.sedeForm.get('pais')?.valueChanges.subscribe(value => {
      if (value !== null) {
        this.departamentosService.getAllDepartamentosByPais(value.id).subscribe(resp => {
          this.departamentos = resp.datos;
        }, error => {
          console.error(error);
        });
      }
    });

    this.sedeForm.get('departamento')?.valueChanges.subscribe(value => {
      if (value !== null) {
        this.ciudadesService.getAllCiudadesByDepartamento(value.id).subscribe(resp => {
          this.ciudades = resp.datos;
        }, error => {
          console.error(error);
        });
      }
    });
  }

  guardarSede(): void {
    this.sedeService.saveSede(this.sedeForm.value).subscribe(
      resp => {
        alert(resp.mensajes[0]);
        this.sedeForm.reset();
        this.sede.push(resp);
        console.log(resp);
      },
      error => {
        console.error(error);
        alert(error.error.mensajes[0]);
      }
    );
  }

cargarDepartamentosPorPaisesId(event: any) {
  const paisId: number = parseInt(event.target.value, 10);
  this.departamentosService.getAllDepartamentosByPais(paisId).subscribe(
    resp => {
      this.departamentos = resp.datos;
    },
    error => {
      console.error(error);
    }
  );
}

cargarCiudadesPorDepartamentoId(event: any) {
  const departamentoId: number = parseInt(event.target.value, 10);
  this.ciudadesService.getAllCiudadesByDepartamento(departamentoId).subscribe(
    resp => {
      this.ciudades = resp.datos;
    },
    error => {
      console.error(error);
    }
  );
}
}



