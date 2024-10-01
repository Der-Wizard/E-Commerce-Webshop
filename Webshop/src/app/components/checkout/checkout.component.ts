import { Component } from '@angular/core';
import { CartService } from '../../services/checkout/cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  currentMilestone: string = 'Information';
  constructor(private cartService: CartService, private router: Router){
    if(this.cartService.getCart()?.length === 0 ){
      this.router.navigate(['']);
    }
  }
}
