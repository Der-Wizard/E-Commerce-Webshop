import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  newsletterForm: FormGroup;
  successMessage: string = '';
  showMessage: boolean = false;

  constructor(private fb: FormBuilder) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  subscribeToNewsletter() {
    if (this.newsletterForm.valid) {
      const formValues = this.newsletterForm.value;
      console.log("New Subscriber: " + formValues.email);
      this.showSuccessMessage("Subscription successful!");
    }
  }

  showSuccessMessage(message: string) {
    this.successMessage = message;
    this.showMessage = true;

    setTimeout(() => {
      this.fadeOutMessage();
    }, 3000);
  }

  fadeOutMessage() {
    this.showMessage = false;
    this.successMessage = '';
  }

  scrollToSearchBar(event: Event) {
    event.preventDefault();
    const searchBar = document.querySelector('#title');
    if (searchBar) {
      searchBar.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
