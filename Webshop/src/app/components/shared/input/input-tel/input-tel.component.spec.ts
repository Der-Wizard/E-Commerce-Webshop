import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTelComponent } from './input-tel.component';

describe('InputTelComponent', () => {
  let component: InputTelComponent;
  let fixture: ComponentFixture<InputTelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
