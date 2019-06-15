import { UserService } from './../../services/user.service';
import { RolService } from './../../services/rol.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Rol } from 'src/app/models/rol';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css'],
  providers: [RolService, UserService]
})
export class RolComponent implements OnInit {
  public token;
  public opcionBoton: string;
  public estado: string;

  constructor(private userService: UserService, private rolService: RolService) {
    this.opcionBoton = 'Registrar';
    this.token = this.userService.obtenerToken();
  }

  ngOnInit() {
    console.log('!Componente cargado!');
    this.ListarRoles();
  }
  // metodo para listar roles
  ListarRoles() {
    this.rolService.listarRoles(this.token).subscribe(
    res => this.rolService.roles = res.roles as Rol[], error => console.log( error as any));
  }

  // metodo para guardar rol
  guardarRol(form: NgForm) {
    if (form.value._id) {
      this.rolService.actualizarRol(this.token, form.value).subscribe((res) => {
        this.opcionBoton = 'Registrar';
        this.ListarRoles();
        form.reset();
      }, error => console.log(error as any));
    } else {

      this.rolService.guardarRol(this.token, form.value).subscribe(
        (res) => {
          this.ListarRoles();
          form.reset();
        }, error => console.log(error as any));
      }
  }


  editarRol(rol: Rol) {
    this.opcionBoton = 'Editar';
    this.rolService.rolSeleccionado = rol;
  }

  eliminarRol(idRol: string) {
    if (confirm('estas seguro de eliminar este rol?')) {
      this.rolService.eliminarRol(this.token, idRol).subscribe(res => this.ListarRoles(), error => console.log(error as any));
    }
  }

}
