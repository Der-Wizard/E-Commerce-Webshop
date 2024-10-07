import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { InputEmailComponent } from '../shared/input/email/input-email.component';
import { InputSelectComponent } from '../shared/input/input-select/input-select.component';
import { InputTextComponent } from '../shared/input/text/input-text.component';
import { InputTelComponent } from '../shared/input/input-tel/input-tel.component';
import { InputRadioComponent } from '../shared/input/input-radio/input-radio.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LabelSyncDirective } from '../../directives/input/label-sync.directive';
import { CartService } from '../../services/checkout/abstract-cart-service';

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
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder, private cartService: CartService, private router: Router) {
    if (this.cartService.cartLength === 0) {
      this.navigate('');
    };

    this.contactForm = this.fb.group({
      contact_user_email: ['', [Validators.required, Validators.email]],
    });

    this.shippingAddressForm = this.fb.group({
      shipping_address_user_country_code: ['', [Validators.required]],
      shipping_address_user_forname: ['', [Validators.required]],
      shipping_address_user_surname: ['', [Validators.required]],
      shipping_address_user_company: [''],
      shipping_address_user_address: ['', [Validators.required]],
      shipping_address_user_address_additional: [''],
      shipping_address_user_postalcode: ['', [Validators.required]],
      shipping_address_user_city: ['', [Validators.required]],
      shipping_address_user_phone: ['', [Validators.required,
      Validators.pattern(/^\+?(\d{1,3})?[-.\s]?(\d{1,4})?[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/)]],
    });

    this.shippingMethodForm = this.fb.group({
      shipping_method_shipping_method: [null, [Validators.required]],
    });

    this.paymentForm = this.fb.group({
      paymentOption: [null, [Validators.required]]
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

  onSubmitPaymentOption() {
    this.confirmOrder();
  }
  selectedShippingMethod: { name: string, formattedCost: string } | null = null;

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  goToInformation() {
    this.currentMilestone = 'Information';
    this.shippingMethodForm.reset();
  }
  goToShipping() {
    this.selectedShippingMethod = this.getShippingMethod();
    this.currentMilestone = 'Shipping';
  }
  goToPayment() {
    this.currentMilestone = 'Payment';
  }

  continueToShipping() {
    if (this.contactForm.invalid || this.shippingAddressForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.shippingAddressForm.markAllAsTouched();
      return;
    }
    this.goToShipping();
  }

  continueToPayment() {
    if (this.shippingMethodForm.invalid) {
      this.shippingMethodForm.markAllAsTouched();
      return;
    }
    this.goToPayment();
  }

  confirmOrder() {
    this.cartService.clear();
    this.router.navigate(['confirmation', 15]);
  }

  getShippingMethod(): { name: string, formattedCost: string } {
    console.log(this.shippingAddressForm.controls['shipping_address_user_country_code'].value)
    var method;
    switch (this.shippingAddressForm.controls['shipping_address_user_country_code'].value) {
      case 'DE':
        method = { name: 'Germany', cost: 0 }
        break;
      default:
        method = { name: 'International', cost: 15 };
        break;
    }
    return {
      name: method?.name ?? '404',
      formattedCost: this.formatCurrency(typeof method?.cost === 'number' ? method.cost : 404)
    };
  }
}