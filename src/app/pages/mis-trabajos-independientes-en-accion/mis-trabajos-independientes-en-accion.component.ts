import { Component } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mis-trabajos-independientes-en-accion',
  standalone: false,
  templateUrl: './mis-trabajos-independientes-en-accion.component.html',
  styleUrls: ['./mis-trabajos-independientes-en-accion.component.css']
})
export class MisTrabajosIndependientesEnAccionComponent {
    id: number | null = null;
      res: any[]=[];
      bandera: boolean = true;
      // Define los posibles estados que se pueden seleccionar
      estados: string[] = ['PENDIENTE', 'EN_PROGRESO', 'FINALIZADO', 'CANCELADO'];
    
      constructor(private serviciosService: ServiciosService,
        private route: ActivatedRoute) {}
      ngOnInit(): void {
        // Obtiene el parámetro de la ruta
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        console.log('ID recibido:', this.id);
        this.cargarTrabajos(this.id);
      }
    
      cambiarEstado(nuevoEstado: string,id:any): void {
        if (!nuevoEstado) {
          alert('Por favor, seleccione un nuevo estado.');
          return;
        }
        console.log('Nuevo estado seleccionado:', nuevoEstado);
        this.serviciosService.actualizarIndEstadoTrabajoEnAccion(id,nuevoEstado).subscribe({
          next: (res) => {
            console.log('res==> ',res);
            this.cargarTrabajos(this.id);
          },
          error: (err) => console.error(err)
        });
        
      }
    
      eliminar(id:any){
          this.serviciosService.postEliminarTrabajoIndependienteEnAccion(id).subscribe({
            next: (res) => {
              console.log('res==> ',res);
              this.cargarTrabajos(this.id);
            },
            error: (err) => console.error(err)
          });
      }
    
      cargarTrabajos(id:any) {
        
        this.serviciosService.getmisTrabajosIndependientesEnAccion(id).subscribe({
          next: (res) => {
            console.log('res==> ',res);
            this.res = res;
          },
          error: (err) => console.error(err)
        });
      }

}
