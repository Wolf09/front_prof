import { Component, Input } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agrega-trabajo-empresa',
  standalone: false,
  templateUrl: './agrega-trabajo-empresa.component.html',
  styleUrls: ['./agrega-trabajo-empresa.component.css']
})
export class AgregaTrabajoEmpresaComponent {
  @Input() trabajo: any;
    nuevoForm: FormGroup;
    nuevo: string= 'nuevo'
  
    constructor(private serviciosService: ServiciosService,
      public activeModal: NgbActiveModal, 
      private fb: FormBuilder
      ) {
      // Define el formulario con los campos que necesites
      this.nuevoForm = this.fb.group({
        descripcion: ['', Validators.required],
        descripcionCorta: ['', Validators.required],
        precio: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        // Puedes agregar más campos aquí...
      });
    }
  
    ngOnInit(): void {
      if (this.trabajo) {
        this.nuevo='editar';
        this.nuevoForm.patchValue({
          descripcion: this.trabajo.descripcion,
          descripcionCorta: this.trabajo.descripcionCorta,
          precio: this.trabajo.precio
        });
      }
    }
    
  
      onSubmit() {
        if (this.nuevo==='nuevo') {
            this.agregar();
          
        } else {
            this.editar();
        }
      }
  
  
      agregar(){
        if (this.nuevoForm.valid) {
          // Aquí puedes procesar los datos del formulario
          const id: number | null= Number(localStorage.getItem('id'));
          this.serviciosService.postCrearTrabajoEmpresa(id,this.nuevoForm.value).subscribe({
            next: (response) => {
              alert('Guardado exitosamente');
              this.activeModal.close(this.nuevoForm.value);
            },
            error: (err) => {
              console.error('Error al guardar el trabajo:', err);
              alert('Error al guardar el trabajo, por favor intente de nuevo.');
            }
          });
          
        } else {
          // Opcional: marcar campos como tocados para mostrar errores
          Object.values(this.nuevoForm.controls).forEach(control => {
            control.markAsTouched();
          });
        }
      }
  
      editar(){
        if (this.nuevoForm.valid) {
          this.serviciosService.putActualizarTrabajoEmpresa(this.trabajo.idTrabIndependiente, this.nuevoForm.value)
            .subscribe({
              next: (response) => {
                alert('Actualizado exitosamente');
                this.activeModal.close(response);
              },
              error: (err) => {
                console.error('Error al actualizar:', err);
                alert('Error al actualizar el trabajo.');
              }
            });
        } else {
          Object.values(this.nuevoForm.controls).forEach(control => control.markAsTouched());
        }
      }
  
    
  
    onCancel(): void {
      this.activeModal.dismiss('cancelado');
    }

}
