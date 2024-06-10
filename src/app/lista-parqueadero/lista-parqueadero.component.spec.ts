import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaParqueaderoComponent } from './lista-parqueadero.component';

describe('ListaParqueaderoComponent', () => {
  let component: ListaParqueaderoComponent;
  let fixture: ComponentFixture<ListaParqueaderoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaParqueaderoComponent]
    });
    fixture = TestBed.createComponent(ListaParqueaderoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
