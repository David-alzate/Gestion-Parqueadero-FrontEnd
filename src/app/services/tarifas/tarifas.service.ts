import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarifasService {

  private API_SERVER = "http://localhost:8080/tarifas/"

  constructor(private httpCliente: HttpClient) { }

  public getAllTarifas(): Observable<any> {
    return this.httpCliente.get(this.API_SERVER);
  }

  public getAllTarifasActivas(): Observable<any> {
    return this.httpCliente.get(this.API_SERVER + "activas")
  }

  public saveTarifa(tarifa: any): Observable<any> {
    return this.httpCliente.post(this.API_SERVER, tarifa);
  }

  public deleteTarifa(id: any): Observable<any> {
    return this.httpCliente.delete(this.API_SERVER + id);
  }

  updateTarifa(id: any, tarifa: {nombre: string}): Observable<any> {
    return this.httpCliente.put(this.API_SERVER + id, tarifa);
  }
}
