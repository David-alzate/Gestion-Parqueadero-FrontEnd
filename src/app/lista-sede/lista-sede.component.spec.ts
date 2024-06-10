import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSedeComponent } from './lista-sede.component';

describe('ListaSedeComponent', () => {
  let component: ListaSedeComponent;
  let fixture: ComponentFixture<ListaSedeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaSedeComponent]
    });
    fixture = TestBed.createComponent(ListaSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
