import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-header-empresa',
  standalone: false,
  templateUrl: './header-empresa.component.html',
  styleUrls: ['./header-empresa.component.css']
})
export class HeaderEmpresaComponent {

      plainSearchControl = new FormControl('', Validators.required);
    
      // Opciones para el autocomplete
      options: string[] = ['Angular', 'React', 'Vue', 'Svelte', 'Ember'];
    
      // Opciones filtradas (observable)
      filteredOptions!: Observable<string[]>;

      constructor(private dialog:MatDialog,
                        private router:Router){                 
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
    

      misTrabajos(){
        this.router.navigate(['trabajos-empresas']);
      }

}
