import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgregaTrabajoEmpresaComponent } from '../../popups/agrega-trabajo-empresa/agrega-trabajo-empresa.component';

@Component({
  selector: 'app-mis-trabajos-empresas',
  standalone: false,
  templateUrl: './mis-trabajos-empresas.component.html',
  styleUrls: ['./mis-trabajos-empresas.component.css']
})
export class MisTrabajosEmpresasComponent implements OnInit{

  res: any[]=[];
    res1: any=null;
    constructor(private serviciosService: ServiciosService,
      private modalService: NgbModal,
            private dialog:MatDialog,
            private router:Router){    
        }

        ngOnInit(): void {
          this.cargarTrabajos();
         }

               agregarTrabajoEmpresa(): void {
                       const modalgRef = this.modalService.open(AgregaTrabajoEmpresaComponent, { size: 'lg' });
                       modalgRef.result.then(
                         (result) => {
                           if (result) {
                             // Actualizar la lista después de la edición
                             this.cargarTrabajos();
                           }
                           console.log('Modal cerrado con resultado:', result);
                         },
                         (reason) => {
                           console.log('Modal descartado:', reason);
                         }
                       );
                   
                 }
         
               actualizarTrabajoEmpresa(trabajo: any) {
                 const modalRef = this.modalService.open(AgregaTrabajoEmpresaComponent, { size: 'lg' });
                 modalRef.componentInstance.trabajo = trabajo; // <-- aquí se envían los datos
             
                 modalRef.result.then((resultadoActualizado) => {
                   if (resultadoActualizado) {
                     // Actualizar la lista después de la edición
                     this.cargarTrabajos();
                   }
                   console.log('Modal cerrado con resultado:', resultadoActualizado);
                 },
                 (reason) => {
                   console.log('Modal descartado:', reason);
                  }
               
                 );
               }



         confirmarEliminarTrabajo(id: number): void {
          if (confirm('¿Estás seguro de que deseas eliminar este trabajo?')) {
            this.eliminarTrabajo(id);
          }
        }
  
        eliminarTrabajo(id: number): void {
          this.serviciosService.postEliminarTrabajoEmpresa(id).subscribe({
            next: () => {
              alert('Trabajo eliminado exitosamente.');
              this.cargarTrabajos();  // actualiza la lista automáticamente
            },
            error: (err) => {
              console.error(err);
              alert('Error al eliminar el trabajo, intenta nuevamente.');
            }
          });
        }

        cargarTrabajos() {
          const id = Number(localStorage.getItem('id'));
          this.serviciosService.getMisTrabajosEmpresas(id).subscribe({
            next: (res) => {
              this.res = res;
              this.res1=this.res[0];
            },
            error: (err) => console.error(err)
          });
        }
  
        trabajosRealizados(id: any){
          this.router.navigate(['/mis-trabajos-empresas-en-accion',id]);
        }
  
        encodeText(text: string): string {
          return encodeURIComponent(text);
        }

}
