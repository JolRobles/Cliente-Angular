import { Sala } from './../models/sala';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  constructor(public http: HttpClient) {
    this.url = Global.url;
    this.salaSeleccionada = new Sala();
  }
  public  url: string;
  public salaSeleccionada: Sala;
  public salas: Sala[];

  listarSalas(token): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type',
    'application/json').set('token', token);

    return this.http.get(this.url + 'sala', {headers});
  }

  guardarSala(token, sala: Sala): Observable<any> {
    // convertir modelo de rol en string json
    const params = JSON.stringify(sala);
    // realizare peticion que sera  una aplicación json con parametro token
    const headers = new HttpHeaders().set('Content-Type',
    'application/json').set('token', token);

    return this.http.post(this.url + 'sala', params, {headers});
  }

  actualizarSala(token, sala: Sala): Observable<any> {
    const params = JSON.stringify(sala);
    const headers = new HttpHeaders().set('Content-Type',
    'application/json').set('token', token);
    return this.http.put(`${this.url}sala/${sala._id}`, params, {headers});
  }

  eliminarSala(token, idSala): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type',
    'application/json').set('token', token);

    return this.http.delete(`${this.url}sala/${idSala}`, {headers});
  }
}

