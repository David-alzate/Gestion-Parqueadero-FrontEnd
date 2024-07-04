import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoService {

  private API_SERVER = "http://localhost:8080/tipoVehiculos/"

  constructor(
    private httpCliente: HttpClient
  ) { }

  public getAllTipoVehiculo(): Observable<any> { 
    return this.httpCliente.get(this.API_SERVER);
}
}
