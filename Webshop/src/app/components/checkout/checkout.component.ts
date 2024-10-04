import { Component } from '@angular/core';
import { CartService } from '../../services/checkout/cart.service';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { InputEmailComponent } from '../shared/input/email/input-email.component';
import { InputSelectComponent } from '../shared/input/input-select/input-select.component';
import { InputTextComponent } from '../shared/input/text/input-text.component';
import { InputTelComponent } from '../shared/input/input-tel/input-tel.component';
import { InputRadioComponent } from '../shared/input/input-radio/input-radio.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LabelSyncDirective } from '../../directives/input/label-sync.directive';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    LabelSyncDirective,
    CommonModule,
    InputEmailComponent,
    InputSelectComponent,
    InputTextComponent,
    InputTelComponent,
    InputRadioComponent,
    CurrencyPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  contactForm: FormGroup;
  shippingAddressForm: FormGroup;
  shippingMethodForm: FormGroup;
  currentMilestone: string = 'Information';

  constructor(private fb: FormBuilder, private cartService: CartService, private router: Router) {
    if (this.cartService.getCart()?.length === 0) {
      this.navigate('');
    };

    this.contactForm = this.fb.group({
      contact_user_email: ['abc@web.de', [Validators.required, Validators.email]],
    });

    this.shippingAddressForm = this.fb.group({
      shipping_address_user_country_code: ['AT', [Validators.required]],
      shipping_address_user_forname: ['a', [Validators.required]],
      shipping_address_user_surname: ['a', [Validators.required]],
      shipping_address_user_company: [''],
      shipping_address_user_address: ['a', [Validators.required]],
      shipping_address_user_address_additional: [''],
      shipping_address_user_postalcode: ['a', [Validators.required]],
      shipping_address_user_city: ['a', [Validators.required]],
      shipping_address_user_phone: ['+4917661474443', [Validators.required,
      Validators.pattern(/^\+?(\d{1,3})?[-.\s]?(\d{1,4})?[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/)]],
    });

    this.shippingMethodForm = this.fb.group({
      shipping_method_shipping_method: [null, [Validators.required]],
    });

  }

  onSubmitContactForm() {
    this.continueToShipping();
  }

  onSubmitShippingAddressForm() {
    this.continueToShipping();
  }

  onSubmitShippingMethodForm() {
    this.continueToPayment();
  }

  shippingMethods = [
    { name: 'International', cost: 10.00 },
    { name: 'Europe', cost: 3.00 },
    { name: 'Germany', cost: 0.00 }
  ];

  selectedShippingMethod: { name: string, formattedCost: string } | null = null;

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  goToInformation() {
    this.currentMilestone = 'Information';
  }
  goToShipping() {
    this.selectedShippingMethod = this.getShippingMethod();
    this.currentMilestone = 'Shipping';
  }
  goToPayment() {
    this.currentMilestone = 'Payment';
  }

  continueToShipping() {
    if (this.contactForm.invalid || this.shippingAddressForm.invalid)
      return;
    this.goToShipping();
  }

  continueToPayment(){
    if(this.shippingMethodForm.invalid) 
      return;
    this.goToPayment();
  }

  getShippingMethod(): { name: string, formattedCost: string } {
    const index = Math.floor(Math.random() * this.shippingMethods.length);
    const method = this.shippingMethods[index];
    return {
      name: method.name,
      formattedCost: this.formatCurrency(method.cost)
    };
  }
}