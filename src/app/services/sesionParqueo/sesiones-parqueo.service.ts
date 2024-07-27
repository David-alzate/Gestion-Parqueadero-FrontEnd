import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionesParqueoService {

  private API_SERVER = "http://localhost:8080/sesionesParqueo/"

  constructor(private httpCliente: HttpClient) { }

  public getAllSesiones(): Observable<any> {
    return this.httpCliente.get(this.API_SERVER);
  }

  public ingresarVehiculo(sede: any): Observable<any> {
    return this.httpCliente.post(this.API_SERVER, sede);
  }

  public deleteSesion(id: any): Observable<any> {
    return this.httpCliente.delete(this.API_SERVER + id);
  }

  updateSesion(id: any, sede: { nombre: string }): Observable<any> {
    return this.httpCliente.put(this.API_SERVER + id, sede);
  }
}
