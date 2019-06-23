import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasAnadeComponent } from './personas-anade.component';

describe('PersonasAnadeComponent', () => {
  let component: PersonasAnadeComponent;
  let fixture: ComponentFixture<PersonasAnadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasAnadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasAnadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
