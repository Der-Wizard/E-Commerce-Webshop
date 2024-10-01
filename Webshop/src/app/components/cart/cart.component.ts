import { ChangeDetectorRef, Component } from '@angular/core';
import { CartService } from '../../services/checkout/cart.service';
import { CommonModule, NgFor } from '@angular/common';
import { CartItemCardComponent } from './cart-item-card/cart-item-card.component';
import { Router } from '@angular/router';

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
  cartTotal: number = 0;
  constructor(public cartService: CartService, private cd: ChangeDetectorRef, private router:Router) {
   }

  checkCart() {
    this.cd.detectChanges();
  }

  navigateCheckOut(){
    this.router.navigate(['checkout']);
  }
}
