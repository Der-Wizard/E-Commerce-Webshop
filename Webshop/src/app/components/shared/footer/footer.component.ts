import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { ContactFormComponent } from '../../contact-form/contact-form.component';
import { NewsletterService } from '../../../services/newsletter/newsletter-service';
import { CustomAlertService } from '../../../services/messages/custom-alert.service';
import { InputEmailComponent } from "../input/email/input-email.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    ContactFormComponent,
    SuccessMessageComponent,
    InputEmailComponent
],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  newsletterForm: FormGroup;
  successMessage: string = '';
  private messageTimeOut: any;
  showMessage: boolean = false;


  constructor(private fb: FormBuilder, private newsletterService: NewsletterService, private alertService: CustomAlertService) {
    this.newsletterForm = this.fb.group({
      email_newsletter: ['', [Validators.required, Validators.email]],
    });
  }
  subscribeToNewsletter() {
    if (this.newsletterForm.valid) {
      this.newsletterService.subscribeEmail(this.newsletterForm.value.email_newsletter).subscribe({
        next: (response: any) => {
          this.alertService.createSuccessMessage(response.message);
        }
      })
    }
  }

  showResultMessage(message: string) {
    this.successMessage = message;
    this.showMessage = true;
    if (this.messageTimeOut) {
      clearTimeout(this.messageTimeOut);
    }

    this.messageTimeOut = setTimeout(() => {
      this.fadeOutMessage();
    }, 3000);
  }

  fadeOutMessage() {
    this.showMessage = false;
    this.successMessage = '';
  }

  scrollToTop(event: Event) {
    event.preventDefault();
    const searchBar = document.querySelector('#top-of-page');
    if (searchBar) {
      searchBar.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
