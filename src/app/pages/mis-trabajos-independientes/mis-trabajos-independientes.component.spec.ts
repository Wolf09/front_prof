import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTrabajosIndependientesComponent } from './mis-trabajos-independientes.component';

describe('MisTrabajosIndependientesComponent', () => {
  let component: MisTrabajosIndependientesComponent;
  let fixture: ComponentFixture<MisTrabajosIndependientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisTrabajosIndependientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisTrabajosIndependientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
