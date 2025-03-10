import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { MisTrabajosIndependientesComponent } from './pages/mis-trabajos-independientes/mis-trabajos-independientes.component';
// Ajusta la ruta según tu estructura
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
  { path: 'trabajos-independientes', component: MisTrabajosIndependientesComponent },
  // Puedes agregar otras rutas aquí, por ejemplo:
  // { path: 'about', component: AboutComponent },
];

