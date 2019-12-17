import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteringComponent } from './metering.component';

describe('MeteringComponent', () => {
  let component: MeteringComponent;
  let fixture: ComponentFixture<MeteringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeteringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
