import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  private API_SERVER = "http://localhost:8080/vehiculos/"

  constructor(private httpCliente: HttpClient) { }

  public getAllVehiculos(): Observable<any> {
    return this.httpCliente.get(this.API_SERVER);
  }

  public saveVehiculo(vehiculo: any): Observable<any> {
    return this.httpCliente.post(this.API_SERVER, vehiculo);
  }

  public deleteVehiculo(id: any): Observable<any> {
    return this.httpCliente.delete(this.API_SERVER + id);
  }

  updateVehiculo(id: any, vehiculo: {nombre: string}): Observable<any> {
    return this.httpCliente.put(this.API_SERVER + id, vehiculo);
  }
}
