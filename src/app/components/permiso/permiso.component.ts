import { UserService } from './../../services/user.service';
import { PermisoService } from './../../services/permiso.service';
import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/services/rol.service';
import { Permiso } from 'src/app/models/permiso';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-permiso',
  templateUrl: './permiso.component.html',
  styleUrls: ['./permiso.component.css'],
  providers: [PermisoService, UserService, RolService]
})
export class PermisoComponent implements OnInit {
  public token;
  public opcionBoton: string;
  public estado: string;
  constructor(private permisoService: PermisoService, private userService: UserService, private rolService: RolService) {
    this.opcionBoton = 'Registrar';
    this.token = this.userService.obtenerToken();
  }

  ngOnInit() {
    console.log('!Componente cargador!');
    this.ListarPermisos();
    this.obtenerRoles();
  }

  ListarPermisos() {
    this.permisoService.listarPermisos(this.token).subscribe(
      res => this.permisoService.permisos = res.permisos as Permiso[], error => console.log(error as any));
  }

  obtenerRoles() {
    this.rolService.listarRoles(this.token).subscribe((res) => this.rolService.roles = res.roles, error => console.log(error as any));
  }

  guardarPermiso(form: NgForm) {
    this.permisoService.guardarPermiso(this.token, form.value).subscribe((res) => {
      this.ListarPermisos();
      form.reset();
    }, error => console.log(error as any));

  }

  editarPermiso(permiso: Permiso) {
    this.opcionBoton = 'Editar';
    this.permisoService.permisoSeleccionado = permiso;
  }

  eliminarPermiso(idPermiso: string) {
    if (confirm('estas seguro de eliminar este permiso?')) {
      this.permisoService.eliminarPermiso(this.token, idPermiso).subscribe(
        res => this.ListarPermisos(), error => console.log(error as any));
    }
  }
}
