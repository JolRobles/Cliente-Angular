import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';
import { Observable } from 'rxjs';
import { Permiso } from '../models/permiso';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  public url: string;
  public permisoSeleccionado: Permiso;
  public permisos: Permiso[];

  constructor(public http: HttpClient) {
    this.url = Global.url;
    this.permisoSeleccionado = new Permiso();
  }

  listarPermisos(token): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type',
    'application/json').set('token', token);

    return this.http.get(this.url + 'permiso', {headers});
  }

  guardarPermiso(token, permiso: Permiso): Observable<any> {
    const params = JSON.stringify(permiso);
    console.log(params);
    const headers = new HttpHeaders().set('Content-Type',
    'application/json').set('token', token);

    return this.http.post(this.url + 'permiso', params, {headers});
  }

  editarPermiso(token, permiso: Permiso): Observable<any> {
    const params = JSON.stringify(permiso);
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('token', token);

    return this.http.put(this.url + `usuario/${permiso._id}`, params, { headers});
  }

  eliminarPermiso(token, idPermiso): Observable<any> {
    console.log("entro a eliminar");
    const headers = new HttpHeaders().set('Content-Type',
    'application/json').set('token', token);

    return this.http.delete(`${this.url}permiso/${idPermiso}`, {headers});
  }

}