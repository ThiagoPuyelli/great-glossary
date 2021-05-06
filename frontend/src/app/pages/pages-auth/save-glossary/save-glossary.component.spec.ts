import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveGlossaryComponent } from './save-glossary.component';

describe('SaveGlossaryComponent', () => {
  let component: SaveGlossaryComponent;
  let fixture: ComponentFixture<SaveGlossaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveGlossaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveGlossaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
