import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { MisTrabajosIndependientesComponent } from './pages/mis-trabajos-independientes/mis-trabajos-independientes.component';
import { MisTrabajosEmpresasComponent } from './pages/mis-trabajos-empresas/mis-trabajos-empresas.component';
import { MisTrabajosEmpresasEnAccionComponent } from './pages/mis-trabajos-empresas-en-accion/mis-trabajos-empresas-en-accion.component';
import { MisTrabajosIndependientesEnAccionComponent } from './pages/mis-trabajos-independientes-en-accion/mis-trabajos-independientes-en-accion.component';
// Ajusta la ruta según tu estructura
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
  { path: 'trabajos-independientes', component: MisTrabajosIndependientesComponent },
  { path: 'trabajos-empresas', component: MisTrabajosEmpresasComponent},
  { path: 'mis-trabajos-empresas-en-accion/:id', component: MisTrabajosEmpresasEnAccionComponent},
  { path: 'mis-trabajos-independientes-en-accion/:id', component: MisTrabajosIndependientesEnAccionComponent}
  // Puedes agregar otras rutas aquí, por ejemplo:
  // { path: 'about', component: AboutComponent },
];

