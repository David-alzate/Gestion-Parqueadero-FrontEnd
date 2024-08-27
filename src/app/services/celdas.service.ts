import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CeldasService {

  private API_SERVER = "http://localhost:8080/celdas/"

  constructor(private httpCliente: HttpClient) { }

  public getAllCeldas(): Observable<any> {
    return this.httpCliente.get(this.API_SERVER);
  }

  public saveCelda(celda: any): Observable<any> {
    return this.httpCliente.post(this.API_SERVER, celda);
  }

  public deleteCelda(id: any): Observable<any> {
    return this.httpCliente.delete(this.API_SERVER + id);
  }

  updateCelda(id: any, celda: { nombre: string }): Observable<any> {
    return this.httpCliente.put(this.API_SERVER + id, celda);
  }
}
