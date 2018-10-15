import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresourceComponent } from './addresource.component';

describe('AddresourceComponent', () => {
  let component: AddresourceComponent;
  let fixture: ComponentFixture<AddresourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddresourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
