import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '../../../services/checkout/models/cart-item';
import { ProductService } from '../../../services/data/abstract-product-service';
import { Product } from '../../../services/data/models/product';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { CartService } from '../../../services/checkout/abstract-cart-service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'cart-item-card',
  standalone: true,
  imports: [
    CurrencyPipe, AsyncPipe
  ],
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.scss'
})
export class CartItemCardComponent implements OnInit {
  @Input() cartItem!: CartItem;
  product$!: BehaviorSubject<Product>;

  private cartItem$ = new BehaviorSubject<CartItem>(this.cartItem);
  total$ = new BehaviorSubject<number>(0);
  quantity$ = new BehaviorSubject<number>(0);

  constructor(private productService: ProductService, public cartService: CartService, private router: Router) {
  }

  ngOnInit() {
    this.productService.getProductById(this.cartItem.productId).subscribe((product) => {
      if(product === undefined)
      {
        this.router.navigate(['products']);
        return;
      }
      this.product$ = new BehaviorSubject<Product>(product);
    });
    this.cartService.cart$.subscribe(arr => {
      this.cartItem$.next(arr.find(x => x.productId === this.cartItem.productId) ?? this.cartItem)
    });
    this.cartItem$.subscribe(x => {
      this.total$.next(x.total);
      this.quantity$.next(x.quantity);
    });
  }

  removeCartItem() {
    this.cartService.remove(this.cartItem.productId);
  }

  increaseItemQuantity() {
    this.cartService.changeQuantityBy(this.cartItem.productId, 1);
  }

  decreaseItemQuantity() {
    this.cartService.changeQuantityBy(this.cartItem.productId, -1);
  }
}
