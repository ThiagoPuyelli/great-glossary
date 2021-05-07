import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGlossaryComponent } from './update-glossary.component';

describe('UpdateGlossaryComponent', () => {
  let component: UpdateGlossaryComponent;
  let fixture: ComponentFixture<UpdateGlossaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGlossaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGlossaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
