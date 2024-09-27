import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleLightModeComponent } from './toggle-light-mode.component';

describe('ToggleLightModeComponent', () => {
  let component: ToggleLightModeComponent;
  let fixture: ComponentFixture<ToggleLightModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleLightModeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleLightModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
