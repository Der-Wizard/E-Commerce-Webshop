import { Component } from '@angular/core';
import { CartService } from '../../services/checkout/cart.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgFor,
    CommonModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(public cartService: CartService){}
}
