import { Injectable } from '@angular/core';
import { CartItem } from './models/cart-item';
import { Product } from '../data/models/product';
import { CartService } from './abstract-cart-service';
import { DummyProductService } from '../data/dummy-product.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DummyCartService extends CartService {
  override cart: CartItem[] = [];
  private cartKey: string = '##local_dummy_cart##';

  constructor(private productService: DummyProductService) {
    super();
    this.readCartFromLocalStorage();
  }

  private readCartFromLocalStorage() {
    var localStorageCart = localStorage.getItem(this.cartKey);
    if (localStorageCart) {
      this.cart = JSON.parse(localStorageCart);
    }
    else {
      localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
    }
  }
  private saveCart(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
  }

  override isCartEmpty(): boolean {
    return this.cart.length === 0;
  }
  override isCartNotEmpty(): boolean {
    return this.cart.length !== 0;
  }
  override getCart(): CartItem[] {
    return this.cart;
  }
  override getCartLength(): number {
    return this.cart.length;
  }
  override getCartTotal(): number {
    var total = 0;
    this.cart.forEach((cartItem: CartItem) => {
      this.productService.getProductById(cartItem.id)?.subscribe((product: Product) => {
        total += product.price;
      });
    });
    return total;
  }
  override add(id: string, quantity: number): void {
    const existentCartItemIndex = this.getCartItemIndex(id);
    if (existentCartItemIndex !== -1) {
      this.cartItemChangeQuantity(this.cart[existentCartItemIndex],quantity);
    }
    else {
      this.cart.push(new CartItem(id, quantity));
      this.saveCart();
    }
  }
  override remove(id: string): void {
    const existentCartItemIndex = this.getCartItemIndex(id);
    if (existentCartItemIndex !== -1) {
      this.cart.splice(existentCartItemIndex, 1);
    }
    this.saveCart();

  }
  override changeQuantityBy(id: string, delta: number): void  {
    const existentCartItemIndex = this.getCartItemIndex(id);
    if (existentCartItemIndex === -1) {
      return;
    }
    this.cartItemChangeQuantity(this.cart[existentCartItemIndex], delta);
    this.saveCart();

  }
  override clear(): void  {
    this.cart = [];
    this.saveCart();
  }
  override getQuantityOfId(id: string): number {
    const existentCartItemIndex = this.getCartItemIndex(id);
    if (existentCartItemIndex === -1)
      return existentCartItemIndex;
    return this.cart[existentCartItemIndex].quantity;
  }
  override setQuantity(id: string, quantity: number): void {
    const existentCartItemIndex = this.getCartItemIndex(id);
    if (existentCartItemIndex === -1)
      return ;
    if (typeof quantity !== 'number') {
      throw new Error('Value must be a number');
    };
    this.cart[existentCartItemIndex].quantity = quantity;
  }

  private getCartItemIndex(id: string): number {
    return this.cart.findIndex(x => x.id === id);
  }
  private cartItemChangeQuantity(cartItem: CartItem, delta: number) {
    if (typeof delta !== 'number') {
      throw new Error('Value must be a number');
    }
    cartItem.quantity += delta;

    if (cartItem.quantity <= 0)
      this.remove(cartItem.id);
  }
}
