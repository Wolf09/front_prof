import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderIndependienteComponent } from './header-independiente.component';

describe('HeaderIndependienteComponent', () => {
  let component: HeaderIndependienteComponent;
  let fixture: ComponentFixture<HeaderIndependienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderIndependienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderIndependienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
