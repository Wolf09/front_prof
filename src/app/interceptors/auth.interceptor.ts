import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');

    let authReq = req;

    if (token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return next.handle(authReq).pipe(
      tap({
        error: (error) => {
          if (error.status === 401 || error.status === 403) {
            alert("Tu sesión expiró o no tienes permisos para realizar esta acción. Por favor, inicia sesión nuevamente.");
            localStorage.removeItem('token');  // Eliminar el token
            localStorage.removeItem('id');     // Eliminar el id almacenado
            this.router.navigate(['/iniciar-sesion']); // Redireccionar a iniciar sesión
          }
        }
      })
    );
  }

}

    
