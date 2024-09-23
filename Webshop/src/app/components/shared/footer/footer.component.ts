import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  newsletterForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  subscribeToNewsletter() {
    if(this.newsletterForm.valid){
      const formValues = this.newsletterForm.value;
      console.log("New Subscriber: " + formValues.email);
    }
  }
}
