import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTarifaComponent } from './crear-tarifa.component';

describe('CrearTarifaComponent', () => {
  let component: CrearTarifaComponent;
  let fixture: ComponentFixture<CrearTarifaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearTarifaComponent]
    });
    fixture = TestBed.createComponent(CrearTarifaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
