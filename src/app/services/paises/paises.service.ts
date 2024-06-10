import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private API_SERVER = "http://localhost:8080/paises/"

  constructor(
    private httpCliente: HttpClient
  ) { }

  public getAllPaises(): Observable<any> { 
    return this.httpCliente.get(this.API_SERVER);
}
} 