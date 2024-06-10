import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParqueaderosService } from '../services/parqueaderos/parqueaderos.service';

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
    public ParqueaderosService: ParqueaderosService
  ){
    this.ParqueaderoForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  guardarParqueadero(): void{
    this.ParqueaderosService.saveParqueadero(this.ParqueaderoForm.value).subscribe(resp => {
      alert(resp.mensajes[0]);
      this.ParqueaderoForm.reset();
      this.Parqueadero.push(resp);
      console.log(resp);
  },
    error => { console.error(error); alert(error.error.mensajes[0]); }
    
  );
  }

}
