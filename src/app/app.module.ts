import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { routes } from './app.routes';
import { RegistroComponent } from './pages/registro/registro.component';
import { HeaderClienteComponent } from './shared/header-cliente/header-cliente.component';
import { HeaderIndependienteComponent } from './shared/header-independiente/header-independiente.component';
import { HeaderEmpresaComponent } from './shared/header-empresa/header-empresa.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SuccessDialogComponent } from './shared/success-dialog/success-dialog.component';
import { MisTrabajosIndependientesComponent } from './pages/mis-trabajos-independientes/mis-trabajos-independientes.component';
import { AgregaTrabajoIndependienteComponent } from './popups/agrega-trabajo-independiente/agrega-trabajo-independiente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,  // declara aquí los componentes que ya no serán standalone
    RegistroComponent,
    HeaderClienteComponent,
    HeaderIndependienteComponent,
    HeaderEmpresaComponent,
    IniciarSesionComponent,
    SuccessDialogComponent,
    MisTrabajosIndependientesComponent,
    AgregaTrabajoIndependienteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    // Importa otros módulos que necesites (FormsModule, RouterModule, etc.)
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
