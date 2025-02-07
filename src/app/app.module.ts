import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent  // declara aquí los componentes que ya no serán standalone
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    // Importa otros módulos que necesites (FormsModule, RouterModule, etc.)
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
