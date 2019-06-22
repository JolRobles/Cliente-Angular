import { InicioComponent } from './components/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RolComponent } from './components/rol/rol.component';
import { UserComponent } from './components/user/user.component';
import { SalasComponent } from './components/salas/salas.component';
import { PermisoComponent } from './components/permiso/permiso.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'roles', component: RolComponent},
  {path: 'usuarios', component: UserComponent},
  {path: 'salas', component: SalasComponent},
  {path: 'permisos', component: PermisoComponent},
  {path: '**', component: InicioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
