import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  private API_SERVER = "http://localhost:8080/sedes/"

  constructor(private httpCliente: HttpClient) { }

  public getAllSedes(): Observable<any> {
    return this.httpCliente.get(this.API_SERVER);
  }

  public saveSede(sede: any): Observable<any> {
    return this.httpCliente.post(this.API_SERVER, sede);
  }
}
