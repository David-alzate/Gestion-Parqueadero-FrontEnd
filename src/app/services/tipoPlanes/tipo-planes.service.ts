import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoPlanesService {

  private API_SERVER = "http://localhost:8080/tipoPlanes/"

  constructor(private httpCliente: HttpClient) { }

  public getAllTipoPlanes(): Observable<any> {
    return this.httpCliente.get(this.API_SERVER);
  }
}
