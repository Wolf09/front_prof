import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaTrabajoEmpresaComponent } from './agrega-trabajo-empresa.component';

describe('AgregaTrabajoEmpresaComponent', () => {
  let component: AgregaTrabajoEmpresaComponent;
  let fixture: ComponentFixture<AgregaTrabajoEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregaTrabajoEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregaTrabajoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
