import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../../services/servicios.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  orderFilter: string = 'ventas';
  ratingFilter: string = '4'; // Ejemplo: "4.5", "4", "3.5" o "3"
  searchPlain: any | null = null;
  bandera: boolean=true;
  resEmp: any[]=[];
  resInd: any[]=[];
  
  constructor(private route: ActivatedRoute,
              private serviciosService: ServiciosService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const dataParam = params['data'];
      if (dataParam) {
        try {
          // Primero, decodifica el parámetro y luego lo parsea
          const decoded = decodeURIComponent(dataParam);
          this.searchPlain = JSON.parse(decoded);
          console.log('Datos recibidos:', this.searchPlain);
        } catch (error) {
          console.error('Error al parsear los datos:', error);
          this.searchPlain = null;
        }
      } else {
        this.searchPlain = null;
      }
      if (this.searchPlain) {
        this.bandera = false;
        this.cargarTrabajos(this.searchPlain.pais,this.searchPlain.ciudad,this.searchPlain.buscador,'','');
        // Aquí puedes llamar a cargarTrabajos() o realizar otra acción según lo recibido
      }
    });
    
    
  }
  

  aplicarFiltro(order: string, rating: string) {
    console.log("Aplicando filtros:", order, rating);
    //this.cargarTrabajos(this.searchPlain ? this.searchPlain : '', order, rating);
    if(this.searchPlain){
      this.cargarTrabajos(this.searchPlain.pais,this.searchPlain.ciudad,this.searchPlain.buscador,order,rating);
    }else{
        console.log('pais,ciudad, y el campo buscar no pueden estar vacios');
        alert('pais,ciudad, y el campo buscar no pueden estar vacios');

    }
  }




  cargarTrabajos(pais:string,ciudad:string,descripcion: string, filtro: string, calificacion: string) {
    console.log('this.searchPlain en el servicio: ',this.searchPlain.pais);
    localStorage.setItem('mipais',pais);
    localStorage.setItem('miciudad',ciudad);
    localStorage.setItem('midescripcion',descripcion);
    this.serviciosService.getFiltrosIndependientes(pais,ciudad,descripcion,filtro,calificacion).subscribe({
      next: (res) => {
        this.resInd = [...res];
        
      },
      error: (err) => console.error(err)
    });
    this.serviciosService.getFiltrosEmpresas(pais,ciudad,descripcion,filtro,calificacion).subscribe({
      next: (res) => {
        this.resEmp = [...res];
        
      },
      error: (err) => console.error(err)
    });
  }

}
