import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // O tu archivo de estilos
})
export class HeaderComponent implements OnInit {
  // Control para la barra de búsqueda con autocomplete
  plainSearchControl = new FormControl('', Validators.required);

  // Opciones para el autocomplete
  options: string[] = ['Angular', 'React', 'Vue', 'Svelte', 'Ember'];

  // Opciones filtradas (observable)
  filteredOptions!: Observable<string[]>;

  constructor(private router:Router){

  }

  ngOnInit() {

  }

  // Función para obtener los valores al presionar un botón, por ejemplo:
  obtenerValores(): void {
    console.log('Valor Búsqueda Normal:', this.plainSearchControl.value);
    if(this.plainSearchControl.value!=null && this.plainSearchControl.value!='') {
      this.router.navigate(['/'], { 
        queryParams: { 
          searchPlain: this.plainSearchControl.value,
        } 
      });
    }else{
      alert('El campo de busqueda deben estar llenos');
    }

  }



}

