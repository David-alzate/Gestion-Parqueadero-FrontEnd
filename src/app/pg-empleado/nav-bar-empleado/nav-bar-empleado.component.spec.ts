import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarEmpleadoComponent } from './nav-bar-empleado.component';

describe('NavBarEmpleadoComponent', () => {
  let component: NavBarEmpleadoComponent;
  let fixture: ComponentFixture<NavBarEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarEmpleadoComponent]
    });
    fixture = TestBed.createComponent(NavBarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
