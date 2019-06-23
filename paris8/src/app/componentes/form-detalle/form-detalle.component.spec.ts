import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDetalleComponent } from './form-detalle.component';

describe('FormDetalleComponent', () => {
  let component: FormDetalleComponent;
  let fixture: ComponentFixture<FormDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
