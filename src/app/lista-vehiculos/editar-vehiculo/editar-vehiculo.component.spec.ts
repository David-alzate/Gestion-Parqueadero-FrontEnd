import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVehiculoComponent } from './editar-vehiculo.component';

describe('EditarVehiculoComponent', () => {
  let component: EditarVehiculoComponent;
  let fixture: ComponentFixture<EditarVehiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarVehiculoComponent]
    });
    fixture = TestBed.createComponent(EditarVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
