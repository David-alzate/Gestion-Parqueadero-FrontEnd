import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgAdminComponent } from './pg-admin.component';

describe('PgAdminComponent', () => {
  let component: PgAdminComponent;
  let fixture: ComponentFixture<PgAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PgAdminComponent]
    });
    fixture = TestBed.createComponent(PgAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
