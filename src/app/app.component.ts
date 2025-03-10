import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ServiciosService } from './services/servicios.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front_prof';
  userType: string | null = 'Desconocido'; // Valor por defecto; puede ser 'Empresa' o 'Independiente'

  constructor(private serviciosService: ServiciosService,private router: Router){
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.serviciosService.updateUserTypeFromToken(token);
    
    // Suscríbete para obtener actualizaciones en userType
    this.serviciosService.userType$.subscribe(tipo => {
      this.userType = tipo;
      console.log('userType actualizado:', this.userType);
    });
  

  }

}
