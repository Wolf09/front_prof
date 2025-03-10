import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from '../../services/servicios.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: false,
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit{

  registroForm!: FormGroup;
  
    constructor(private fb: FormBuilder, 
        private serviciosService: ServiciosService,
        private dialog:MatDialog,
        private router:Router)  { }
  
    ngOnInit(): void {
      // Definición del formulario con los campos comunes y extendidos
      this.registroForm = this.fb.group({
        correo: ['jhonbarh@gmail.com', [Validators.required, Validators.email]],
        password: ['Thefaztweb1%', [
          Validators.required, 
          Validators.minLength(8), 
          Validators.maxLength(60),
          Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,60}$')
        ]],
      });
  
      // todo esta funcion tambien debe aplicarse a Empresa e Independiente
      // Cuando el tipoUsuario cambia, se habilitan o deshabilitan los campos extendidos
      /* this.registroForm.get('tipoUsuario')?.valueChanges.subscribe(value => {
        if (value === 'Cliente') {
          this.disableExtendedFields();
        } else if(value === 'Independiente'){
          this.disableExtendedFieldsIndep();
        } else if(value === 'Empresa'){
          this.disableExtendedFieldsEmp();
        }
         else {
          this.enableExtendedFields();
        } 
      }); */
    }

    onSubmit(): void {
      if (this.registroForm.valid) {
        console.log('Datos del registro:', this.registroForm.value);
        this.serviciosService.postLogin(this.registroForm.value).subscribe({
          next: (response) => {
            console.log('Login exitoso: ', response.token);
            const token: string = response.token;
            localStorage.setItem('token', token);
            const payloadBase64 = token.split('.')[1];
            //const payloadJson = atob(payloadBase64);
            const payloadJson = this.decodeUtf8(payloadBase64);
            const payload = JSON.parse(payloadJson);
            localStorage.setItem('pais',payload.pais);
            localStorage.setItem('ciudad',payload.ciudad);
            localStorage.setItem('id',payload.id);
            this.serviciosService.updateUserTypeFromToken(token);
            this.router.navigate(['']);
          },
          error: (error) => {
            console.error('Error al iniciar sesión:', error);
          }
        });
      } else {
        console.log('Errores en password:', this.registroForm.get('password')?.errors);
        console.log('Errores en correo:', this.registroForm.get('correo')?.errors);
        console.log('El formulario es inválido');
      }
    }

    decodeUtf8(base64: string): string {
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return new TextDecoder('utf-8').decode(bytes);
    }
    
    
}
