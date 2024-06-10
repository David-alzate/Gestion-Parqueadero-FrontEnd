import { Component } from '@angular/core';
import { ParqueaderosService } from '../services/parqueaderos/parqueaderos.service';
@Component({
  selector: 'app-lista-parqueadero',
  templateUrl: './lista-parqueadero.component.html',
  styleUrls: ['./lista-parqueadero.component.css']
})
export class ListaParqueaderoComponent {

  parqueaderos: any[] = [];

  constructor(
    public parqueaderosService: ParqueaderosService
  ) { 
    
  }

  ngOnInit(): void {


    this.parqueaderosService.getAllParqueaderos().subscribe(resp => {
      this.parqueaderos = resp.datos
    },
      error => { console.error(error) }
    );

  }

  eliminarParqueadero(id: string) {

}
}
