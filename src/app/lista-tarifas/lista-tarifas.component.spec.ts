import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTarifasComponent } from './lista-tarifas.component';

describe('ListaTarifasComponent', () => {
  let component: ListaTarifasComponent;
  let fixture: ComponentFixture<ListaTarifasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaTarifasComponent]
    });
    fixture = TestBed.createComponent(ListaTarifasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
