import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarParqueaderoComponent } from './editar-parqueadero.component';

describe('EditarParqueaderoComponent', () => {
  let component: EditarParqueaderoComponent;
  let fixture: ComponentFixture<EditarParqueaderoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarParqueaderoComponent]
    });
    fixture = TestBed.createComponent(EditarParqueaderoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
