import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvfComponent } from './ovf.component';

describe('OvfComponent', () => {
  let component: OvfComponent;
  let fixture: ComponentFixture<OvfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
