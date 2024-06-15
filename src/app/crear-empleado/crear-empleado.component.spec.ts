import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEmpleadoComponent } from './crear-empleado.component';

describe('CrearEmpleadoComponent', () => {
  let component: CrearEmpleadoComponent;
  let fixture: ComponentFixture<CrearEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearEmpleadoComponent]
    });
    fixture = TestBed.createComponent(CrearEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
