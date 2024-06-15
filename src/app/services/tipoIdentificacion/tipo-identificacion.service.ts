import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoIdentificacionService {

  private API_SERVER = "http://localhost:8080/tipoIdentificaciones/"

  constructor(private httpCliente: HttpClient) { }

  public getAllTipoIdentificaciones(): Observable<any> {
    return this.httpCliente.get(this.API_SERVER);
  }
}
