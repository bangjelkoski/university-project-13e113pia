import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreduzecaComponent } from './preduzeca.component';

describe('PreduzecaComponent', () => {
  let component: PreduzecaComponent;
  let fixture: ComponentFixture<PreduzecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreduzecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreduzecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
