import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  private API_SERVER = "http://localhost:8080/planes/"

  constructor(private httpCliente: HttpClient) { }

  public getAllPlanes(): Observable<any> {
    return this.httpCliente.get(this.API_SERVER);
  }

  public getPlanesActivos(): Observable<any> {
    return this.httpCliente.get(this.API_SERVER + "activos");
  }

  public savePlan(plan: any): Observable<any> {
    return this.httpCliente.post(this.API_SERVER, plan);
  }

  public deletePlan(id: any): Observable<any> {
    return this.httpCliente.delete(this.API_SERVER + id);
  }

  updatePlan(id: any, plan: { nombre: string }): Observable<any> {
    return this.httpCliente.put(this.API_SERVER + id, plan);
  }
}
