import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearVehiculoComponent } from './crear-vehiculo.component';

describe('CrearVehiculoComponent', () => {
  let component: CrearVehiculoComponent;
  let fixture: ComponentFixture<CrearVehiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearVehiculoComponent]
    });
    fixture = TestBed.createComponent(CrearVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
