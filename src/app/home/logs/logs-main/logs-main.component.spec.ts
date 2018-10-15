import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsMainComponent } from './logs-main.component';

describe('LogsMainComponent', () => {
  let component: LogsMainComponent;
  let fixture: ComponentFixture<LogsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
