import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarAdminComponent } from './nav-bar-admin.component';

describe('NavBarAdminComponent', () => {
  let component: NavBarAdminComponent;
  let fixture: ComponentFixture<NavBarAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarAdminComponent]
    });
    fixture = TestBed.createComponent(NavBarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
