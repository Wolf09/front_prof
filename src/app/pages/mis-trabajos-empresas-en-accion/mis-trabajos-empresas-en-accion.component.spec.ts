import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTrabajosEmpresasEnAccionComponent } from './mis-trabajos-empresas-en-accion.component';

describe('MisTrabajosEmpresasEnAccionComponent', () => {
  let component: MisTrabajosEmpresasEnAccionComponent;
  let fixture: ComponentFixture<MisTrabajosEmpresasEnAccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisTrabajosEmpresasEnAccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisTrabajosEmpresasEnAccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
