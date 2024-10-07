import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputEmailComponent } from '../shared/input/email/input-email.component';
import { InputTelComponent } from '../shared/input/input-tel/input-tel.component';
import { InputTextComponent } from '../shared/input/text/input-text.component';
import { InputSelectComponent } from '../shared/input/input-select/input-select.component';
import { InputTextAreaComponent } from '../shared/input/input-text-area/input-text-area.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputEmailComponent,
    InputTelComponent,
    InputTextComponent,
    InputTextAreaComponent,
    InputSelectComponent
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  contactFormular: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.contactFormular = this.fb.group({
      question: ['', [Validators.required]],
      countryCode: ['', Validators.required],
      company: [''],
      address: ['', Validators.required],
      addressAdditional: [''],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', [Validators.required,
      Validators.pattern(/^\+?(\d{1,3})?[-.\s]?(\d{1,4})?[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/)]],
      forname: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.contactFormular.invalid){
      this.contactFormular.markAllAsTouched()
      return;
    }
      this.router.navigate(['contact-form-confirmation']);
  }
}
