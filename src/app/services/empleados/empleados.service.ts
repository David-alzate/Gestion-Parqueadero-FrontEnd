import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private API_SERVER = "http://localhost:8080/empleados/"

  constructor(private httpCliente: HttpClient) { }

  public getAllEmpleados(): Observable<any> {
    return this.httpCliente.get(this.API_SERVER);
  }

  public saveEmpleado(empleado: any): Observable<any> {
    return this.httpCliente.post(this.API_SERVER, empleado);
  }

  public deleteEmpleado(id: any): Observable<any> {
    return this.httpCliente.delete(this.API_SERVER + id);
  }

  updateEmpleado(id: any, empleado: {nombre: string}): Observable<any> {
    return this.httpCliente.put(this.API_SERVER + id, empleado);
  }
}
