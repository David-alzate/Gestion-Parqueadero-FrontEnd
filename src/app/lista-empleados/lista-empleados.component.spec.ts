import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEmpleadosComponent } from './lista-empleados.component';

describe('ListaEmpleadosComponent', () => {
  let component: ListaEmpleadosComponent;
  let fixture: ComponentFixture<ListaEmpleadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaEmpleadosComponent]
    });
    fixture = TestBed.createComponent(ListaEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
