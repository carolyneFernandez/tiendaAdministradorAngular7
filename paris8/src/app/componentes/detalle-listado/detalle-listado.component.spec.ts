import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleListadoComponent } from './detalle-listado.component';

describe('DetalleListadoComponent', () => {
  let component: DetalleListadoComponent;
  let fixture: ComponentFixture<DetalleListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
