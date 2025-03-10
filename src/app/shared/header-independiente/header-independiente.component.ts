import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-header-independiente',
  standalone: false,
  templateUrl: './header-independiente.component.html',
  styleUrls: ['./header-independiente.component.css']
})
export class HeaderIndependienteComponent {

  autoSearchControl = new FormControl('', Validators.required);
        plainSearchControl = new FormControl('', Validators.required);
      
        // Opciones para el autocomplete
        options: string[] = ['Angular', 'React', 'Vue', 'Svelte', 'Ember'];
      
        // Opciones filtradas (observable)
        filteredOptions!: Observable<string[]>;
      
        ngOnInit() {
          let cont =0;
          
          this.filteredOptions = this.autoSearchControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || ''))
          );        

        }
      
        constructor(private dialog:MatDialog,
                  private router:Router){                 
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

        misTrabajos(){
          this.router.navigate(['trabajos-independientes']);
        }
}
