import { Injectable } from '@angular/core';
import { CartItem } from './models/cart-item';
import { ProductService } from '../data/abstract-product-service';
import { Product } from '../data/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey: string = 'cartKey';

  constructor(private productService: ProductService) {

  }

  removeItemFromCart(id: string) {
    const cart = this.getCart();
    const existingItemIndex = cart.findIndex(item => item.id === id);

    if (existingItemIndex === -1) {
      return;
    } else {
      cart.splice(existingItemIndex, 1);
    }

    this.saveCart(cart);
  }

  addItemToCart(id: string, quantity: number): void {
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

  changeQuantityOnItem(id: string, delta: number){
    const cart = this.getCart();
    const existingItemIndex = cart.findIndex(item => item.id === id);

    if (existingItemIndex !== -1) {
      var d_cartItem: CartItem = cart[existingItemIndex];
      d_cartItem.quantity += Number(delta);
      if(d_cartItem.quantity <= 0) {
        this.removeItemFromCart(id);
      }
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
    const cart = this.getCart();
    cart.length = 0;
    localStorage.removeItem(this.cartKey);
  }

  getTotal():number {
    const cart = this.getCart();

    var totalPrize = 0.00;

    cart.forEach((cartItem: CartItem) => {
      this.productService.getProductById(cartItem.id)?.subscribe((product: Product) => {
        totalPrize += cartItem.quantity * product.price;
      });
    });

    return totalPrize;
  }
}

