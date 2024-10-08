import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '../../../services/checkout/models/cart-item';
import { ProductService } from '../../../services/data/abstract-product-service';
import { Product } from '../../../services/data/models/product';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../services/checkout/abstract-cart-service';

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

  price: number = 0;
  quantity: number = 0;
  total: number = 0;

  constructor(private productService: ProductService, private cartService: CartService) {
  }

  ngOnInit() {
    this.productService.getProductById(this.cartItem.productId)?.subscribe((product) => {
      if (product === undefined)
        return;
      this.product = product;
      this.price = product.price;
      this.quantity = this.cartItem.quantity;
      this.total = this.price * this.quantity;
    });
  }

  removeCartItem() {
    this.cartService.remove(this.cartItem.productId);
  }

  increaseItemQuantity() {
    this.cartService.changeQuantityBy(this.cartItem.productId, 1);
    this.quantity = this.cartItem.quantity;
    this.total = this.price * this.quantity;
  }

  decreaseItemQuantity() {
    this.cartService.changeQuantityBy(this.cartItem.productId, -1);
    this.quantity = this.cartItem.quantity;
    this.total = this.price * this.quantity;
  }
}
