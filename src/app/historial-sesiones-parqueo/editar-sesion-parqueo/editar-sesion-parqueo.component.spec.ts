import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSesionParqueoComponent } from './editar-sesion-parqueo.component';

describe('EditarSesionParqueoComponent', () => {
  let component: EditarSesionParqueoComponent;
  let fixture: ComponentFixture<EditarSesionParqueoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarSesionParqueoComponent]
    });
    fixture = TestBed.createComponent(EditarSesionParqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
