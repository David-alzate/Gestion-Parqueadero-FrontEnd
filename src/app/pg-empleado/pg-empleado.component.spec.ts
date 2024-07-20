import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgEmpleadoComponent } from './pg-empleado.component';

describe('PgEmpleadoComponent', () => {
  let component: PgEmpleadoComponent;
  let fixture: ComponentFixture<PgEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PgEmpleadoComponent]
    });
    fixture = TestBed.createComponent(PgEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
