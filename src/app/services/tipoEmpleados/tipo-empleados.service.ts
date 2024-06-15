import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoEmpleadosService {

  private API_SERVER = "http://localhost:8080/tipoEmpleados/"

  constructor(private httpCliente: HttpClient) { }

  public getAllTipoEmpleados(): Observable<any> {
    return this.httpCliente.get(this.API_SERVER);
  }
}
