import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSedeComponent } from './crear-sede.component';

describe('CrearSedeComponent', () => {
  let component: CrearSedeComponent;
  let fixture: ComponentFixture<CrearSedeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearSedeComponent]
    });
    fixture = TestBed.createComponent(CrearSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
