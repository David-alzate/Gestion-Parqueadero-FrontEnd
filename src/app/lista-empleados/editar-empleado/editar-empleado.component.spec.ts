import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEmpleadoComponent } from './editar-empleado.component';

describe('EditarEmpleadoComponent', () => {
  let component: EditarEmpleadoComponent;
  let fixture: ComponentFixture<EditarEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarEmpleadoComponent]
    });
    fixture = TestBed.createComponent(EditarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
