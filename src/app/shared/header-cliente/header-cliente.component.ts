import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-header-cliente',
  standalone: false,
  templateUrl: './header-cliente.component.html',
  styleUrls: ['./header-cliente.component.css']
})
export class HeaderClienteComponent {

  autoSearchControl = new FormControl('', Validators.required);
    plainSearchControl = new FormControl('', Validators.required);
  
    // Opciones para el autocomplete
    options: string[] = ['Angular', 'React', 'Vue', 'Svelte', 'Ember'];
  
    // Opciones filtradas (observable)
    filteredOptions!: Observable<string[]>;
  
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
