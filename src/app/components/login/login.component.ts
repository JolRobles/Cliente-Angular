import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public titulo: string;
  public usuario: User;
  public estado: string;
  public identidad;
  public token;

  constructor(private route: ActivatedRoute, private router: Router, private usuarioService: UserService) {
    this.titulo = 'Iniciar sesión';
    this.usuario = new User();
  }

  ngOnInit() {
    console.log('¡Componente iniciar-sesion cargado!');
  }

  iniciarSesion(form: NgForm) {
    this.usuarioService.iniciarSesion(this.usuario).subscribe((res) => {
      console.log(res);
      this.identidad = res.usuario;
      if (!this.identidad || !this.identidad._id) {
        this.estado = 'error';
      } else {
        localStorage.setItem('identidad', JSON.stringify(this.identidad));
        this.obtenerToken();
      }
      this.router.navigate(['/inicio']);
    }, error => console.log(error as any));
  }

  obtenerToken() {
    this.usuarioService.iniciarSesion(this.usuario, 'true').subscribe((res) => {
      console.log(res);
      this.token = res.token;

      if (this.token.length <= 0) {
        this.estado = 'error';
      } else {
        localStorage.setItem('token', this.token);
        this.obtenerToken();
      }
    }, (error) => {
      const mensajeError =  error as any;
      console.log(mensajeError);
      if (mensajeError != null) {
        this.estado = 'error';
      }
    });
  }

}
