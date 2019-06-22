import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { NgForm } from '@angular/forms';
import { Sala } from 'src/app/models/sala';
import { SalaService } from 'src/app/services/sala.service';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css'],
  providers: [SalaService, UserService]
})
export class SalasComponent implements OnInit {
  public token;
  public opcionBoton: string;
  public estado: string;

  constructor(private userService: UserService, private salaService: SalaService) {
    this.opcionBoton = 'Registrar';
    this.token = this.userService.obtenerToken();
  }

  ngOnInit() {
    console.log('!Componente cargado!');
    this.ListarSalas();
  }

  ListarSalas() {
    this.salaService.listarSalas(this.token).subscribe(
    res => this.salaService.salas = res.salas as Sala[], error => console.log( error as any));
  }

  GuardarSala(form: NgForm) {
    if (form.value._id) {
      this.salaService.actualizarSala(this.token, form.value).subscribe((res) => {
        this.opcionBoton = 'Registrar';
        this.ListarSalas();
        form.reset();
      }, error => console.log(error as any));
    } else {

      this.salaService.guardarSala(this.token, form.value).subscribe(
        (res) => {
          this.ListarSalas();
          form.reset();
        }, error => console.log(error as any));
      }
  }

  editarSala(sala: Sala) {
    this.opcionBoton = 'Editar';
    this.salaService.salaSeleccionada = sala;
  }


  eliminarSala(idSala: string) {
    if (confirm('estas seguro de eliminar esta sala?')) {
      this.salaService.eliminarSala(this.token, idSala).subscribe(res => this.ListarSalas(), error => console.log(error as any));
    }
  }

}

