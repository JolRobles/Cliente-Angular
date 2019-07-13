import { Global } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Acceso } from './../models/acceso';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  public url: string;
  public accesoSelecionado: Acceso;
  public accesos: Acceso[];

  constructor(public http: HttpClient) {
    this.url = Global.url;
    this.accesoSelecionado = new Acceso();
  }

  listarAccesos(token): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type',
    'application/json').set('token', token);

    return this.http.get(this.url + 'acceso', {headers});
  }
}

