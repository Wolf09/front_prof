import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private baseUrl = 'http://localhost:8080';

  private userTypeSubject = new BehaviorSubject<string>('Desconocido');
  userType$ = this.userTypeSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Método para registrar un Cliente
  postCliente(data: any): Observable<any> {
    const url = `${this.baseUrl}/auth/registro`;
    return this.http.post(url, data);
  }

  // Método para registrar una Empresa
  postEmpresa(data: any): Observable<any> {
    const url = `${this.baseUrl}/auth/registro`;
    return this.http.post(url, data);
  }

  // Método para registrar un Independiente
  postIndependiente(data: any): Observable<any> {
    const url = `${this.baseUrl}/auth/registro`;
    return this.http.post(url, data);
  }

  // Método para registrar un trabajo de un Independiente
  postCrearTrabajoIndependiente(id: any,data: any): Observable<any>{
    const url = `${this.baseUrl}/trabajo-independiente/crear/${id}`;
    return this.http.post(url,data);
  }

  putActualizarTrabajoIndependiente(id: any,data: any): Observable<any>{
    const url = `${this.baseUrl}/trabajo-independiente/actualizar/${id}`;
    return this.http.put(url,data);
  }

  postEliminarTrabajoIndependiente(id: any): Observable<any>{
    const url = `${this.baseUrl}/trabajo-independiente/eliminar/${id}`;
    return this.http.post(url,{});
  }

  postCrearTrabajoEmpresa(id: any,data: any): Observable<any>{
    const url = `${this.baseUrl}/trabajo-empresa/crear/${id}`;
    return this.http.post(url,data);
  }

  putActualizarTrabajoEmpresa(id: any,data: any): Observable<any>{
    const url = `${this.baseUrl}/trabajo-empresa/actualizar/${id}`;
    return this.http.put(url,data);
  }
  postEliminarTrabajoEmpresa(id: any): Observable<any>{
    const url = `${this.baseUrl}/trabajo-empresa/eliminar/${id}`;
    return this.http.post(url,{});
  }


  // subir IMAGEN
  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    // Ajusta la URL al endpoint de subida en tu backend.
    return this.http.post<{ path: string }>(`${this.baseUrl}/up/upload`, formData)
      .pipe(
        map(response => response.path)
      );
  }
  postLogin(data: any): Observable<any> {
    const url = `${this.baseUrl}/auth/login`;
    return this.http.post(url, data);
  }

  getMisTrabajosIndependientes(id: number): Observable<any[]>{
    const url = `${this.baseUrl}/independiente/mistrabajos/${id}`;
    return this.http.get<any[]>(url);
  }

  getMisTrabajosEmpresas(id: number): Observable<any[]>{
    const url = `${this.baseUrl}/empresa/mistrabajos/${id}`;
    return this.http.get<any[]>(url);
  }

  getmisTrabajosEmpresasEnAccion(id:any): Observable<any[]>{
    const url = `${this.baseUrl}/trabajo-empresa/mis-trabajos-en-accion/${id}`;
    return this.http.get<any[]>(url);
  }

  postEliminarTrabajoEmpresaEnAccion(id:any){
    const url = `${this.baseUrl}/trabajo-emp-en-accion/eliminar/${id}`;
    return this.http.post(url, {});
  }

  getmisTrabajosIndependientesEnAccion(id:any): Observable<any[]>{
    const url = `${this.baseUrl}/trabajo-independiente/mis-trabajos-en-accion/${id}`;
    return this.http.get<any[]>(url);
  }

  postEliminarTrabajoIndependienteEnAccion(id:any){
    const url = `${this.baseUrl}/trabajo-ind-en-accion/eliminar/${id}`;
    return this.http.post(url, {});
  }

  getFiltrosIndependientes(pais:string,ciudad:string,descripcion: string, filtro: string, calificacion: string): Observable<any[]> {
    let params = new HttpParams()
      .set('pais',pais)
      .set('ciudad',ciudad)
      .set('descripcion', descripcion)
      .set('filtro', filtro)
      .set('calificacion', calificacion);
      
    const url = `${this.baseUrl}/clientes/filtroConsultasIndependientes`;
    return this.http.get<any[]>(url, { params });
  }

  getFiltrosEmpresas(pais:string,ciudad:string,descripcion: string, filtro: string, calificacion: string): Observable<any[]> {
    let params = new HttpParams()
      .set('pais',pais)
      .set('ciudad',ciudad)
      .set('descripcion', descripcion)
      .set('filtro', filtro)
      .set('calificacion', calificacion);
      
    const url = `${this.baseUrl}/clientes/filtroConsultasEmpresas`;
    return this.http.get<any[]>(url, { params });
  }

  getTipoUsuarioFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    try {
      // El token JWT se compone de 3 partes separadas por puntos.
      // La segunda parte es el payload en base64.
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      return payload.tipoUsuario || null;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  }

  updateUserTypeFromToken(token: string | null): void {
    if (token) {
      try {
        // Remueve el prefijo "Bearer " si existe:
        const tokenClean = token.startsWith("Bearer ") ? token.replace("Bearer ", "") : token;
        const payloadBase64 = tokenClean.split('.')[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);
        const tipo = payload.tipoUsuario || 'Desconocido';
        this.userTypeSubject.next(tipo);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        this.userTypeSubject.next('Desconocido');
      }
    } else {
      this.userTypeSubject.next('Desconocido');
    }
  }

  actualizarEstadoTrabajoEnAccion(id: any, estadoTrabajo: any){
    const url = `${this.baseUrl}/trabajo-emp-en-accion/actualizar-estadotrabajoenaccion/${id}/${estadoTrabajo}`;
    return this.http.put(url,{});

  }

  actualizarIndEstadoTrabajoEnAccion(id: any, estadoTrabajo:any){
    const url = `${this.baseUrl}/trabajo-ind-en-accion/actualizar-estadotrabajoenaccion/${id}/${estadoTrabajo}`;
    return this.http.put(url,{});
  }






}
