import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  private API_SERVER = "http://localhost:8080/departamentos/"

  constructor(private httpCliente: HttpClient) { }


  public getAllDepartamentosByPais(paisId: number): Observable<any> {
    return this.httpCliente.get(this.API_SERVER + paisId);


}
} 