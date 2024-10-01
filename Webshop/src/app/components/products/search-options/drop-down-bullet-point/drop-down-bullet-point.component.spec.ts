import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownBulletPointComponent } from './drop-down-bullet-point.component';

describe('DropDownBulletPointComponent', () => {
  let component: DropDownBulletPointComponent;
  let fixture: ComponentFixture<DropDownBulletPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropDownBulletPointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropDownBulletPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
