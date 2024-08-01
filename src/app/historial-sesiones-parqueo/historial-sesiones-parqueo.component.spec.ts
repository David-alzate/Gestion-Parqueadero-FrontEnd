import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialSesionesParqueoComponent } from './historial-sesiones-parqueo.component';

describe('HistorialSesionesParqueoComponent', () => {
  let component: HistorialSesionesParqueoComponent;
  let fixture: ComponentFixture<HistorialSesionesParqueoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialSesionesParqueoComponent]
    });
    fixture = TestBed.createComponent(HistorialSesionesParqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
