import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RasadniciComponent } from './rasadnici.component';

describe('RasadniciComponent', () => {
  let component: RasadniciComponent;
  let fixture: ComponentFixture<RasadniciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RasadniciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RasadniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
