import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  private API_SERVER = "http://localhost:8080/ciudades/";

  constructor(private httpClient: HttpClient) { }

  public getAllCiudadesByDepartamento(departamentoId: number): Observable<any> {
    return this.httpClient.get(this.API_SERVER + departamentoId);
  }
}
