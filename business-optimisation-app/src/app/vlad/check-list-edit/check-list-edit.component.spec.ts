/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CheckListEditComponent } from './check-list-edit.component';

describe('CheckListComponent', () => {
  let component: CheckListEditComponent;
  let fixture: ComponentFixture<CheckListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckListEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
