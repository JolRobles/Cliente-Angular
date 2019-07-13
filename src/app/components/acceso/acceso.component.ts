import { AccesoService } from './../../services/acceso.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Acceso } from 'src/app/models/acceso';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css'],
  providers: [AccesoService, UserService]
})
export class AccesoComponent implements OnInit {
  public token;
  public estado: string;
  constructor(private accesoService: AccesoService, private userService: UserService) {
    this.token = this.userService.obtenerToken();
  }

  ngOnInit() {
    console.log('Componente cargado');
    this.listarAccesos();
  }

  listarAccesos() {
    this.accesoService.listarAccesos(this.token).subscribe(
      res => this.accesoService.accesos = res.permisos as Acceso[], error => console.log(error as any));
  }

}