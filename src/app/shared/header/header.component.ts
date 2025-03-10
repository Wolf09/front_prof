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
  autoSearchControl = new FormControl('', Validators.required);
  plainSearchControl = new FormControl('', Validators.required);

  // Opciones para el autocomplete
  options: string[] = ['Angular', 'React', 'Vue', 'Svelte', 'Ember'];

  // Opciones filtradas (observable)
  filteredOptions!: Observable<string[]>;

  constructor(private router:Router){

  }

  ngOnInit() {
    this.filteredOptions = this.autoSearchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  // Función para obtener los valores al presionar un botón, por ejemplo:
  obtenerValores(): void {
    console.log('Valor Autocomplete:', this.autoSearchControl.value);
    console.log('Valor Búsqueda Normal:', this.plainSearchControl.value);
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }


}

