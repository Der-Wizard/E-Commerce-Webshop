import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { CartItemCardComponent } from './cart-item-card/cart-item-card.component';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/abstract-cart-service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    CartItemCardComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(public cartService: CartService, private router: Router) {
  }

  navigateCheckOut() {
    this.router.navigate(['checkout']);
  }
}
