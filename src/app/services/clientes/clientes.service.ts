import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private API_SERVER = "http://localhost:8080/clientes/"

  constructor(private httpCliente: HttpClient) { }

  public getAllClientes(): Observable<any> {
    return this.httpCliente.get(this.API_SERVER);
  }

  public saveCliente(cliente: any): Observable<any> {
    return this.httpCliente.post(this.API_SERVER, cliente);
  }

  public deleteCliente(id: any): Observable<any> {
    return this.httpCliente.delete(this.API_SERVER + id);
  }

  updateCliente(id: any, cliente: {nombre: string}): Observable<any> {
    return this.httpCliente.put(this.API_SERVER + id, cliente);
  }
}
