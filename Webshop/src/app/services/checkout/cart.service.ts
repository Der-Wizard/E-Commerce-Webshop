import { Injectable } from '@angular/core';
import { Product } from '../data/models/product';
import { ProductService } from '../data/abstract-product-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey: string = 'cartKey';

  constructor(private productService: ProductService) { }

  addItemToCart(id: string,quantity: number): void {
    const cart = this.getCart();
    const existingItemIndex = cart.findIndex(item => item.id === id);

    if (existingItemIndex !== -1) {
      var cartItem: CartItem = cart[existingItemIndex];
      cartItem.quantity += Number(quantity);
    } else {
      cart.push({ id, quantity });
    }

    this.saveCart(cart);
  }

  getCart(): CartItem[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  private saveCart(cart: CartItem[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }
}

class CartItem {
  id!: string;
  quantity!: number;
}
