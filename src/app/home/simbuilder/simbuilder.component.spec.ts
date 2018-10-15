import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimbuilderComponent } from './simbuilder.component';

describe('SimbuilderComponent', () => {
  let component: SimbuilderComponent;
  let fixture: ComponentFixture<SimbuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimbuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimbuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
