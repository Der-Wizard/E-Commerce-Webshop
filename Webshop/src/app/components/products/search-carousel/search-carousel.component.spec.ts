import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCarouselComponent } from './search-carousel.component';

describe('SearchCarouselComponent', () => {
  let component: SearchCarouselComponent;
  let fixture: ComponentFixture<SearchCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
