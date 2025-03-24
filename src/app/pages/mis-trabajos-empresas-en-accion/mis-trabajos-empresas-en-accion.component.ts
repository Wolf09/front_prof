import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../../services/servicios.service';

@Component({
  selector: 'app-mis-trabajos-empresas-en-accion',
  standalone: false,
  templateUrl: './mis-trabajos-empresas-en-accion.component.html',
  styleUrls: ['./mis-trabajos-empresas-en-accion.component.css']
})
export class MisTrabajosEmpresasEnAccionComponent implements OnInit{
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
    this.serviciosService.actualizarEstadoTrabajoEnAccion(id,nuevoEstado).subscribe({
      next: (res) => {
        console.log('res==> ',res);
        this.cargarTrabajos(this.id);
      },
      error: (err) => console.error(err)
    });
    
  }

  eliminar(id:any){
      this.serviciosService.postEliminarTrabajoEmpresaEnAccion(id).subscribe({
        next: (res) => {
          console.log('res==> ',res);
          this.cargarTrabajos(this.id);
        },
        error: (err) => console.error(err)
      });
  }

  cargarTrabajos(id:any) {
    
    this.serviciosService.getmisTrabajosEmpresasEnAccion(id).subscribe({
      next: (res) => {
        console.log('res==> ',res);
        this.res = res;
      },
      error: (err) => console.error(err)
    });
  }

}
