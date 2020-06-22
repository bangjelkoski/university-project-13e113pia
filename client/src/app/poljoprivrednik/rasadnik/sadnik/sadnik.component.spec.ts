import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadnikComponent } from './sadnik.component';

describe('SadnikComponent', () => {
  let component: SadnikComponent;
  let fixture: ComponentFixture<SadnikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadnikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
