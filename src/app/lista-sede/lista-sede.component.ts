import { Component } from '@angular/core';
import { SedeService } from '../services/sede/sede.service';

@Component({
  selector: 'app-lista-sede',
  templateUrl: './lista-sede.component.html',
  styleUrls: ['./lista-sede.component.css']
})
export class ListaSedeComponent {

  sedes: any[] = [];

  constructor(
    public sedeService: SedeService
  ) { 
    
  }

  ngOnInit(): void {
    this.sedeService.getAllSedes().subscribe(resp => {
      this.sedes = resp.datos
    },
      error => { console.error(error) }
    );

}

eliminarSedes(id: string) {

}
}