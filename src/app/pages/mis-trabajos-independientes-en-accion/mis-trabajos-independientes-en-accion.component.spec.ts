import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTrabajosIndependientesEnAccionComponent } from './mis-trabajos-independientes-en-accion.component';

describe('MisTrabajosIndependientesEnAccionComponent', () => {
  let component: MisTrabajosIndependientesEnAccionComponent;
  let fixture: ComponentFixture<MisTrabajosIndependientesEnAccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisTrabajosIndependientesEnAccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisTrabajosIndependientesEnAccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
