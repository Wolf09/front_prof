import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTrabajosEmpresasComponent } from './mis-trabajos-empresas.component';

describe('MisTrabajosEmpresasComponent', () => {
  let component: MisTrabajosEmpresasComponent;
  let fixture: ComponentFixture<MisTrabajosEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisTrabajosEmpresasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisTrabajosEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
