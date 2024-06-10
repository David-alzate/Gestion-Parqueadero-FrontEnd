import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParqueaderosService {

  private API_SERVER = "http://localhost:8080/parqueaderos/"

  constructor(private httpCliente: HttpClient) { }

  public getAllParqueaderos(): Observable<any> {
    return this.httpCliente.get(this.API_SERVER);
  }

  public saveParqueadero(parqueadero: any): Observable<any> {
    return this.httpCliente.post(this.API_SERVER, parqueadero);
  }
}
