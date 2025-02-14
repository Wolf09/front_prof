import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  orderFilter: string = 'bestSeller';
  ratingFilter: string = ''; // Ejemplo: "4.5", "4", "3.5" o "3"

  // Variables para los filtros por votación
  rating3to4: boolean = false;
  rating4to5: boolean = false;
  ratingLessThan3: boolean = false;

  aplicarFiltro() {
    console.log("Filtro de rating seleccionado:", this.ratingFilter);
    // Lógica para filtrar tus datos según el valor
  }

}
