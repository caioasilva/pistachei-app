import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelularesPage } from './celulares.page';

describe('CelularesPage', () => {
  let component: CelularesPage;
  let fixture: ComponentFixture<CelularesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelularesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelularesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
