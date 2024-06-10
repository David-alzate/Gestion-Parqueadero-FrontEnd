import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoSedeService {

  private API_SERVER = "http://localhost:8080/tipoSedes/"

  constructor(private httpCliente: HttpClient) { }

  public getAllTipoSedes(): Observable<any> {
    return this.httpCliente.get(this.API_SERVER);
  }
}
