import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveWordComponent } from './save-word.component';

describe('SaveWordComponent', () => {
  let component: SaveWordComponent;
  let fixture: ComponentFixture<SaveWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveWordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
