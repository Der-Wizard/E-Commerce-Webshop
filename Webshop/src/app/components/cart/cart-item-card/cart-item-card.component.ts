import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../../services/checkout/models/cart-item';
import { ProductService } from '../../../services/data/abstract-product-service';
import { Product } from '../../../services/data/models/product';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../services/checkout/cart.service';

@Component({
  selector: 'cart-item-card',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.scss'
})
export class CartItemCardComponent implements OnInit {
  @Input() cartItem!: CartItem;
  product!: Product;

  @Output() onCartItemRemoved = new EventEmitter();

  constructor(private productService: ProductService, private cartService: CartService) {
  }

  ngOnInit() {
    this.productService.getProductById(this.cartItem.id)?.subscribe((product) => {
      this.product = product;
    });
  }

  removeCartItem() {
    this.cartService.removeItemFromCart(this.cartItem.id);
  }

  increaseItemQuantity() {
    this.cartService.changeQuantityOnItem(this.cartItem.id, 1);
  }

  decreaseItemQuantity() {
    this.cartService.changeQuantityOnItem(this.cartItem.id, -1);
  }
}
