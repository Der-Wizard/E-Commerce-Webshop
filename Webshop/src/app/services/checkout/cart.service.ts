import { Injectable } from '@angular/core';
import { CartItem } from './models/cart-item';
import { ProductService } from '../data/abstract-product-service';
import { Product } from '../data/models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartLengthCache: number = 0;
  private cartKey: string = 'cartKey';

  constructor(private productService: ProductService) {

  }

  getCartLength(){
    return this.cartLengthCache;
  }

  removeItemFromCart(id: string) {
    const cart = this.getCartDefinite();
    const existingItemIndex = cart.findIndex(item => item.id === id);

    if (existingItemIndex === -1) {
      return;
    } else {
      cart.splice(existingItemIndex, 1);
    }

    this.saveCart(cart);
    this.cartLengthCache = cart.length;
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
    this.cartLengthCache = cart.length;
  }

  changeQuantityOnItem(id: string, delta: number){
    const cart = this.getCartDefinite();
    const existingItemIndex = cart.findIndex(item => item.id === id);

    if (existingItemIndex !== -1) {
      var d_cartItem: CartItem = cart[existingItemIndex];
      d_cartItem.quantity += Number(delta);
      if(d_cartItem.quantity <= 0) {
        this.removeItemFromCart(id);
      }
    } 
    
    this.saveCart(cart);
    this.cartLengthCache = cart.length;
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
    this.cartLengthCache = 0;
  }

  getTotal():number {
    const cart = this.getCartDefinite();

    var totalPrize = 0.00;

    cart.forEach((cartItem: CartItem) => {
      this.productService.getProductById(cartItem.id)?.subscribe((product: Product) => {
        totalPrize += cartItem.quantity * product.price;
      });
    });

    return totalPrize;
  }
}

