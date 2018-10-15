import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsUpgradeComponent } from './logs-upgrade.component';

describe('LogsUpgradeComponent', () => {
  let component: LogsUpgradeComponent;
  let fixture: ComponentFixture<LogsUpgradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsUpgradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
