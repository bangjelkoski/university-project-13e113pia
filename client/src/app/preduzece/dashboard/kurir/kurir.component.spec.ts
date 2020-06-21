import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KurirComponent } from './kurir.component';

describe('KurirComponent', () => {
  let component: KurirComponent;
  let fixture: ComponentFixture<KurirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KurirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KurirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
