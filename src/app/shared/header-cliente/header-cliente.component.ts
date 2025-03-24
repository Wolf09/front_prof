import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, of, startWith } from 'rxjs';
import { ciudadesPorPais, paises } from '../../ciudades-por-pais/ciudades-por-pais';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-cliente',
  standalone: false,
  templateUrl: './header-cliente.component.html',
  styleUrls: ['./header-cliente.component.css']
})
export class HeaderClienteComponent {

  plainSearchControl = new FormControl('', Validators.required);
    ciudadesFiltradas!: Observable<string[]>;
    misPaises: string[]=paises;
    registroForm!: FormGroup;
    // Opciones para el autocomplete
    options: string[] = ['Angular', 'React', 'Vue', 'Svelte', 'Ember'];
    mipais:string |null=null;
    miciudad:string |null=null;
    mibuscar:string |null=null;
    // Opciones filtradas (observable)
    filteredOptions!: Observable<string[]>;

    constructor(private fb: FormBuilder,private router:Router){

    }
  
    ngOnInit() {
        this.mipais=localStorage.getItem('mipais');
        this.miciudad=localStorage.getItem('miciudad');
        this.mibuscar=localStorage.getItem('midescripcion');
        
      this.registroForm = this.fb.group({
        // Campos comunes
        pais: ['', Validators.required],
        ciudad: ['', Validators.required],
        buscador: ['', Validators.required],
      });
      this.registroForm.get('pais')?.valueChanges.subscribe(selectedPais => {
            this.registroForm.get('ciudad')?.setValue('');
            // Si se selecciona un país, las opciones serán el arreglo correspondiente; si no, un arreglo vacío.
            this.ciudadesFiltradas = of(ciudadesPorPais[selectedPais] || []);
          });
      
      // Para el campo "ciudad" con Autocomplete, filtramos las opciones mientras el usuario escribe.
      this.ciudadesFiltradas = this.registroForm.get('ciudad')!.valueChanges.pipe(
            startWith(''),
            map(value => this._filterCiudades(value, this.registroForm.get('pais')?.value))
        );


        if (this.mipais !== null && this.miciudad !== null && this.mibuscar !== null){
          this.registroForm.patchValue({
            pais: this.mipais,
            ciudad: this.miciudad,
            buscador: this.mibuscar
          });
      }
    }

    onSubmit(): void {
      if (this.registroForm.valid) {
        const formData = this.registroForm.value;
        console.log('Formulario válido. Datos a enviar:', formData);
        // Convierte el objeto a cadena JSON y luego a URI component
        const formDataString = encodeURIComponent(JSON.stringify(formData));
        // Navega pasando la cadena JSON en los query params
        this.router.navigate(['/'], { 
          queryParams: { 
            data: formDataString
          } 
        });
      } else {
        // Marca todos los controles como "touched" para mostrar errores
        Object.keys(this.registroForm.controls).forEach(field => {
          const control = this.registroForm.get(field);
          if (control) {
            control.markAsTouched({ onlySelf: true });
          }
        });
        alert('Formulario inválido. Por favor, complete los campos requeridos.');
        console.log('Formulario inválido. Por favor, complete los campos requeridos.');
      }
    }
    
    
    

    
    private _filterCiudades(value: string, pais: string): string[] {
      if (!pais) return [];
      const filterValue = value.toLowerCase();
      const ciudades = ciudadesPorPais[pais] || [];
      return ciudades.filter(ciudad => ciudad.toLowerCase().includes(filterValue));
    }
  

  
  
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
      return this.options.filter(option =>
        option.toLowerCase().includes(filterValue)
      );
    }
}
