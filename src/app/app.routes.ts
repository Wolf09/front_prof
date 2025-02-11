import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
// Ajusta la ruta según tu estructura

export const routes: Routes = [
  { path: '', component: HomeComponent },
  // Puedes agregar otras rutas aquí, por ejemplo:
  // { path: 'about', component: AboutComponent },
];

