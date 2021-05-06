import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlosariesComponent } from './glosaries.component';

describe('GlosariesComponent', () => {
  let component: GlosariesComponent;
  let fixture: ComponentFixture<GlosariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlosariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlosariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
