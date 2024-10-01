import { Injectable } from '@angular/core';
import { CartItem } from './models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey: string = 'cartKey';

  removeItemFromCart(id: string) {
    const cart = this.getCartDefinite();
    const existingItemIndex = cart.findIndex(item => item.id === id);

    if (existingItemIndex === -1) {
      return;
    } else {
      cart.splice(existingItemIndex, 1);
    }

    this.saveCart(cart);
  }

  addItemToCart(id: string, quantity: number): void {
    const cart = this.getCartDefinite();
    const existingItemIndex = cart.findIndex(item => item.id === id);

    if (existingItemIndex !== -1) {
      var cartItem: CartItem = cart[existingItemIndex];
      cartItem.quantity += Number(quantity);
    } else {
      cart.push({ id, quantity });
    }

    this.saveCart(cart);
  }

  changeQuantityOnItem(cartItem: CartItem){
    const cart = this.getCartDefinite();
    const existingItemIndex = cart.findIndex(item => item.id === cartItem.id);

    if (existingItemIndex !== -1) {
      var d_cartItem: CartItem = cart[existingItemIndex];
      d_cartItem.quantity = cartItem.quantity;
    } 
    
    this.saveCart(cart);
  }

  private getCartDefinite(): CartItem[] {
    const cart = this.getCart();
    if (cart === null)
      return [];
    return cart;
  }

  getCart(): CartItem[] | null {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : null;
  }

  private saveCart(cart: CartItem[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }
}

