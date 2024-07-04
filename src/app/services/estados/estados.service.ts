import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  private API_SERVER = "http://localhost:8080/estados/"

  constructor(
    private httpCliente: HttpClient
  ) { }

  public getAllEstados(): Observable<any> { 
    return this.httpCliente.get(this.API_SERVER);
}

}
