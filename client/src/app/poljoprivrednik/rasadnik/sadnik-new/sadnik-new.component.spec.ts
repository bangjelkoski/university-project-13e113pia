import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadnikNewComponent } from './sadnik-new.component';

describe('SadnikNewComponent', () => {
  let component: SadnikNewComponent;
  let fixture: ComponentFixture<SadnikNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadnikNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadnikNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
