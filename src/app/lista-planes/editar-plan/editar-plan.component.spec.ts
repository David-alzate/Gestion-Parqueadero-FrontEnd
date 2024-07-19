import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPlanComponent } from './editar-plan.component';

describe('EditarPlanComponent', () => {
  let component: EditarPlanComponent;
  let fixture: ComponentFixture<EditarPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarPlanComponent]
    });
    fixture = TestBed.createComponent(EditarPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
