import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoljoprivredniciComponent } from './poljoprivrednici.component';

describe('PoljoprivredniciComponent', () => {
  let component: PoljoprivredniciComponent;
  let fixture: ComponentFixture<PoljoprivredniciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoljoprivredniciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoljoprivredniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
