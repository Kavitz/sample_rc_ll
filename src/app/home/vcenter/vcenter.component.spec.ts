import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VcenterComponent } from './vcenter.component';

describe('VcenterComponent', () => {
  let component: VcenterComponent;
  let fixture: ComponentFixture<VcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
