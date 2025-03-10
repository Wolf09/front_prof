import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from '../../services/servicios.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SuccessDialogComponent } from '../../shared/success-dialog/success-dialog.component';
import { ciudadesPorPais, paises } from '../../ciudades-por-pais/ciudades-por-pais';
import { map, Observable, of, startWith } from 'rxjs';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
// TODO: estoy vizualizando el componente RegistroComponent se debe corregir que los campos hagan lo que se espera por ejemplo foto representante debe subir una foto
  registroForm!: FormGroup;
  files: { [key: string]: File } = {};
  ciudadesFiltradas!: Observable<string[]>;
  misPaises: string[]=paises;

  constructor(private fb: FormBuilder, 
    private serviciosService: ServiciosService,
    private dialog:MatDialog,
    private router:Router)  { }

  ngOnInit(): void {
    // Definición del formulario con los campos comunes y extendidos
    this.registroForm = this.fb.group({
      // Campos comunes
      tipoUsuario: ['Cliente', Validators.required],
      nombres: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      celular: ['', [Validators.required, Validators.pattern('^(1|[5-9][0-9]{2})\\d{7,10}$')]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(60),
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,60}$')
      ]],
      pais: ['', Validators.required],
      ciudad: ['', Validators.required],
      // Campos extendidos (para Empresa o Independiente)
      fotoRepresentante: [''],
      cartaPresentacion: [''],
      mision: [''],
      vision: [''],
      dniAnverso: [''],
      dniReverso: [''],
      profesion: [''],
      fotoTitulo: [''],
      nombreEmpresa: [''],
      registroDeEmpresa: [''],
      licenciaComercial: [''],
      areaTrabajo: ['']
    });

    // Cada vez que cambie el valor de "pais", reiniciamos "ciudad" y actualizamos las opciones.
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

    // Suscribirse al cambio de valor de "tipoUsuario"
  this.registroForm.get('tipoUsuario')?.valueChanges.subscribe(value => {
    // Primero, limpiar validadores de los campos extendidos
    [
      'fotoRepresentante', 'cartaPresentacion', 'mision', 'vision',
      'dniAnverso', 'dniReverso', 'profesion', 'fotoTitulo',
      'nombreEmpresa', 'registroDeEmpresa', 'licenciaComercial', 'areaTrabajo'
    ].forEach(field => {
      this.registroForm.get(field)?.clearValidators();
    });

    if (value === 'Empresa') {
      // Para Empresa se requieren ciertos campos extendidos
      this.registroForm.get('cartaPresentacion')?.setValidators(Validators.required); // ambos
      this.registroForm.get('nombreEmpresa')?.setValidators(Validators.required);
      this.registroForm.get('areaTrabajo')?.setValidators(Validators.required);
    }
    if(value === 'Independiente'){
      this.registroForm.get('cartaPresentacion')?.setValidators(Validators.required);
      this.registroForm.get('areaTrabajo')?.setValidators(Validators.required);
      this.registroForm.get('profesion')?.setValidators(Validators.required);
    }

    [
      'fotoRepresentante', 'cartaPresentacion', 'mision', 'vision',
      'dniAnverso', 'dniReverso', 'profesion', 'fotoTitulo',
      'nombreEmpresa', 'registroDeEmpresa', 'licenciaComercial', 'areaTrabajo'
    ].forEach(field => {
      this.registroForm.get(field)?.updateValueAndValidity();
    });
  });

}

private _filterCiudades(value: string, pais: string): string[] {
  if (!pais) return [];
  const filterValue = value.toLowerCase();
  const ciudades = ciudadesPorPais[pais] || [];
  return ciudades.filter(ciudad => ciudad.toLowerCase().includes(filterValue));
}

  onFileSelected(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Almacenar el archivo en la propiedad files
      this.files[field] = file;
      const maxSize = 2 * 1024 * 1024; // 2 MB en bytes
        if (file.size > maxSize) {
          alert('El tamaño del archivo supera el límite permitido de 2 MB');
          // Limpia el input para que el usuario pueda seleccionar otro archivo
          input.value = "";
          return;
        }
        this.serviciosService.uploadFile(file).subscribe({
          next: (filePath: string) => {
            // Una vez obtenido la ruta, actualizamos el FormGroup con la ruta
            this.registroForm.patchValue({ [field]: filePath });
            this.registroForm.get(field)?.updateValueAndValidity();
          },
          error: (err) => {
            console.error('Error al subir el archivo', err);
            alert('Error al subir el archivo, por favor intente de nuevo.');
          }
        });
    }
  }

  logValidationErrors() {
    Object.keys(this.registroForm.controls).forEach(key => {
      const controlErrors = this.registroForm.get(key)?.errors;
      if (controlErrors) {
        console.log(`Error en ${key}:`, controlErrors);
      }
    });
  }
  


      onSubmit(): void {
        if (this.registroForm.valid) {
          // Clonar el objeto del formulario
          const dataToSend = { ...this.registroForm.value };
          const tipoUsuario = dataToSend.tipoUsuario;

      
          console.log('Datos a enviar:', dataToSend);
      
          let request$;
          if (tipoUsuario === 'Cliente') {
            request$ = this.serviciosService.postCliente(dataToSend);
          } else if (tipoUsuario === 'Empresa') {
            request$ = this.serviciosService.postEmpresa(dataToSend);
          } else if (tipoUsuario === 'Independiente') {
            request$ = this.serviciosService.postIndependiente(dataToSend);
          }
      
          request$!.subscribe({
            next: response => {
              console.log('Registro exitoso:', response);
              this.logValidationErrors();
              this.dialog.open(SuccessDialogComponent, {
                data: { message: response.data }
              }).afterClosed().subscribe(() => {
                this.router.navigate(['']);
              });
            },
            error: error => {
              this.logValidationErrors();
              console.error('Error al registrar:', error);
              alert(JSON.stringify(error.error));
            }
          });
        } else {
          console.log('El formulario es inválido');
          this.logValidationErrors();
        }
      }



      getErrorMessage(field: string): string {
        const control = this.registroForm.get(field);
      
        if (control?.hasError('required')) {
          return 'Este campo es obligatorio.';
        }
      
        if (field === 'correo' && control?.hasError('email')) {
          return 'Ingrese un correo válido.';
        }
      
        if (field === 'password') {
          if (control?.hasError('pattern')) {
            return 'Mínimo 8 caracteres una mayúscula, un número y un carácter especial.';
          }
          if (control?.hasError('minlength')) {
            return `La contraseña debe tener mínimo ${control.errors!['minlength'].requiredLength} caracteres.`;
          }
          if (control?.hasError('maxlength')) {
            return `La contraseña no debe exceder los ${control.errors!['maxlength'].requiredLength} caracteres.`;
          }
        }
      
        if (control?.hasError('minlength')) {
          return `Debe tener mínimo ${control.errors!['minlength'].requiredLength} caracteres.`;
        }
      
        if (control?.hasError('maxlength')) {
          return `Debe tener máximo ${control.errors!['maxlength'].requiredLength} caracteres.`;
        }
      
        if (control?.hasError('pattern')) {
          return 'El formato no es válido.';
        }
      
        return '';
      }          
      
      

  
}

