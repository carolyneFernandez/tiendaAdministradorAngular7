import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaListarComponent } from './factura-listar.component';

describe('FacturaListarComponent', () => {
  let component: FacturaListarComponent;
  let fixture: ComponentFixture<FacturaListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
