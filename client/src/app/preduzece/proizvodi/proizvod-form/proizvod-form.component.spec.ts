import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProizvodFormComponent } from './proizvod-form.component';

describe('ProizvodFormComponent', () => {
  let component: ProizvodFormComponent;
  let fixture: ComponentFixture<ProizvodFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProizvodFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProizvodFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
