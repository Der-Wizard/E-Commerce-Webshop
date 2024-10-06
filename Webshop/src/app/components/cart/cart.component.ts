import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { CartItemCardComponent } from './cart-item-card/cart-item-card.component';
import { Router } from '@angular/router';
import { DummyCartService } from '../../services/checkout/dummy-cart.service';

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
  constructor(public cartService: DummyCartService, private cd: ChangeDetectorRef, private router:Router) {
   }

  checkCart() {
    this.cd.detectChanges();
  }

  navigateCheckOut(){
    this.router.navigate(['checkout']);
  }

}
