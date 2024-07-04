import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoTatifasService {

  private API_SERVER = "http://localhost:8080/tipoTarifas/"

  constructor(
    private httpCliente: HttpClient
  ) { }

  public getAllTiposTarifa(): Observable<any> { 
    return this.httpCliente.get(this.API_SERVER);
}
}
