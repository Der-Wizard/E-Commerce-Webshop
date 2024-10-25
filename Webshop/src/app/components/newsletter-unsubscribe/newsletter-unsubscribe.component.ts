import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewsletterService } from '../../services/newsletter/newsletter-service';
import { SuccessMessageComponent } from '../shared/footer/success-message/success-message.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-newsletter-unsubscribe',
  standalone: true,
  imports: [ReactiveFormsModule, SuccessMessageComponent,
    NgIf
  ],
  templateUrl: './newsletter-unsubscribe.component.html',
  styleUrl: './newsletter-unsubscribe.component.scss'
})
export class NewsletterUnsubscribeComponent {
  newsletterForm: FormGroup;
  successMessage: string = '';
  private messageTimeOut: any;
  showMessage: boolean = false;

  constructor(private fb: FormBuilder, private newsletterService: NewsletterService) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  unsubscribeToNewsletter() {
    if (this.newsletterForm.valid) {
      this.newsletterService.unsubscribeEmail(this.newsletterForm.value.email).subscribe(response => {
        this.showResultMessage(`${response.message}`);
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
}
