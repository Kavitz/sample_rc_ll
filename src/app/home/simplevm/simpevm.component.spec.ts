import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpevmComponent } from './simpevm.component';

describe('SimpevmComponent', () => {
  let component: SimpevmComponent;
  let fixture: ComponentFixture<SimpevmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpevmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpevmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
