import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioAddComponent } from './comentario-add.component';

describe('ComentarioAddComponent', () => {
  let component: ComentarioAddComponent;
  let fixture: ComponentFixture<ComentarioAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentarioAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentarioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
