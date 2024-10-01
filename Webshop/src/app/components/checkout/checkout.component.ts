import { Component } from '@angular/core';
import { CartService } from '../../services/checkout/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  constructor(private cartService: CartService, private router: Router){
    if(this.cartService.getCart()?.length === 0 ){
      this.router.navigate(['']);
    }
  }
}
