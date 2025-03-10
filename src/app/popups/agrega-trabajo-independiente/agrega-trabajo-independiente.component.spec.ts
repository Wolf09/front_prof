import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaTrabajoIndependienteComponent } from './agrega-trabajo-independiente.component';

describe('AgregaTrabajoIndependienteComponent', () => {
  let component: AgregaTrabajoIndependienteComponent;
  let fixture: ComponentFixture<AgregaTrabajoIndependienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregaTrabajoIndependienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregaTrabajoIndependienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
