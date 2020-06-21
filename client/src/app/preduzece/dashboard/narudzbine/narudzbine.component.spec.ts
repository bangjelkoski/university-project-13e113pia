import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NarudzbineComponent } from './narudzbine.component';

describe('NarudzbineComponent', () => {
  let component: NarudzbineComponent;
  let fixture: ComponentFixture<NarudzbineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NarudzbineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NarudzbineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
