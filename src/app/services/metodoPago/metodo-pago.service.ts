import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  private API_SERVER = "http://localhost:8080/metodoPago/"

  constructor(
    private httpCliente: HttpClient
  ) { }

  public getAllMetodosPago(): Observable<any> { 
    return this.httpCliente.get(this.API_SERVER);
}
}
