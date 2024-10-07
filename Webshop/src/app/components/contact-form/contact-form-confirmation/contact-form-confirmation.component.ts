import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-form-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './contact-form-confirmation.component.html',
  styleUrl: './contact-form-confirmation.component.scss'
})
export class ContactFormConfirmationComponent {
  constructor(private router: Router){}
  onClick() {
    this.router.navigate(['products']);
  }
}
