import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCelularPage } from './card-celular.page';

describe('CardCelularPage', () => {
  let component: CardCelularPage;
  let fixture: ComponentFixture<CardCelularPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCelularPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCelularPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
