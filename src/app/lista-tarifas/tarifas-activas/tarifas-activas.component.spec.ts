import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifasActivasComponent } from './tarifas-activas.component';

describe('TarifasActivasComponent', () => {
  let component: TarifasActivasComponent;
  let fixture: ComponentFixture<TarifasActivasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarifasActivasComponent]
    });
    fixture = TestBed.createComponent(TarifasActivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
