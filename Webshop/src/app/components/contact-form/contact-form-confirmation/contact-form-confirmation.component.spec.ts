import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFormConfirmationComponent } from './contact-form-confirmation.component';

describe('ContactFormConfirmationComponent', () => {
  let component: ContactFormConfirmationComponent;
  let fixture: ComponentFixture<ContactFormConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFormConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFormConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
