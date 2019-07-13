import { RolService } from './../../services/rol.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService, RolService]
})
export class UserComponent implements OnInit {
  public token;
  public estado: string;


  constructor(private route: ActivatedRoute, private router: Router, private usuarioService: UserService, private rolService: RolService) {
    this.token = this.usuarioService.obtenerToken();
  }

  ngOnInit() {
    console.log('!Componente usuario cargado!');
    this.obtenerRoles();
  }

  obtenerRoles() {
    this.rolService.listarRoles(this.token).subscribe((res) => this.rolService.roles = res.roles, error => console.log(error as any));
  }


  obtenerUsuarios() {
    this.usuarioService.listarUsuario(this.token).subscribe(
      res => this.usuarioService.usuarios = res.usuarios, error => console.log(error as any)
    );
  }

  guardarUsuarios(form: NgForm) {
    this.usuarioService.registrarUsuario(this.token, form.value).subscribe((res) => {
      this.obtenerUsuarios();
      form.reset();
    }, error => console.log(error as any));

  }

  eliminarUsuario(idUsuario: number) {
    if (confirm('Estas seguro de eliminar este usuario?')) {
        this.usuarioService.eliminarUsuario(this.token, idUsuario).subscribe(res => this.obtenerUsuarios(),
        error => console.log(error as any));
    }
  }
}
