import { Injectable } from '@angular/core';
import { CartItem } from './models/cart-item';
import { Product } from '../data/models/product';
import { CartService } from './abstract-cart-service';
import { ProductService } from '../data/abstract-product-service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DummyCartService extends CartService {
  override cart: CartItem[] = [];
  override cartLength: number = 0;
  override cartTotal: number = 0;
  override isCartEmpty: boolean = false;
  override isCartNotEmpty: boolean = !this.isCartEmpty;
  private cartKey: string = '##local_dummy_cart##';

  constructor(private productService: ProductService) {
    super();
    this.readCartFromLocalStorage();
    this.updateCartInformation();
  }

  override getCartItemTotal(id: string): Observable<number> {
    const existentCartItemIndex = this.getCartItemIndex(id);
    if (existentCartItemIndex !== -1) {
      var cartItem = this.cart[existentCartItemIndex];
      this.productService.getProductById(cartItem.productId)?.subscribe((product: Product) => {
        return of(cartItem.quantity * product.price);
      });
    }
    return of(-1);
  }

  override add(id: string, quantity: number): void {
    const existentCartItemIndex = this.getCartItemIndex(id);
    if (existentCartItemIndex !== -1) {
      this.cartItemChangeQuantity(this.cart[existentCartItemIndex], quantity);
    }
    else {
      this.cart.push(new CartItem(id, quantity));
      this.saveCart();
    }
    this.updateCartInformation();
  }
  override remove(id: string): void {
    const existentCartItemIndex = this.getCartItemIndex(id);
    if (existentCartItemIndex !== -1) {
      this.cart.splice(existentCartItemIndex, 1);
    }
    this.saveCart();
    this.updateCartInformation();
  }
  override changeQuantityBy(id: string, delta: number): void {
    const existentCartItemIndex = this.getCartItemIndex(id);
    if (existentCartItemIndex === -1) {
      return;
    }
    this.cartItemChangeQuantity(this.cart[existentCartItemIndex], delta);
    this.saveCart();
    this.updateCartInformation();
  }
  override clear(): void {
    this.cart = [];
    this.saveCart();
    this.updateCartInformation();
  }
  override setQuantity(id: string, quantity: number): void {
    const existentCartItemIndex = this.getCartItemIndex(id);
    if (existentCartItemIndex === -1)
      return;
    if (typeof quantity !== 'number') {
      throw new Error('Value must be a number');
    };
    this.cart[existentCartItemIndex].quantity = quantity;
    this.updateCartInformation();
  }

  private cartItemChangeQuantity(cartItem: CartItem, delta: number) {
    if (typeof delta !== 'number') {
      throw new Error('Value must be a number');
    }
    cartItem.quantity += delta;

    if (cartItem.quantity <= 0)
      this.remove(cartItem.productId);
    this.updateCartInformation();
  }



  private getCartItemIndex(id: string): number {
    return this.cart.findIndex(x => x.productId === id);
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
  private updateCartInformation(){
    this.cartLength = this.cart.length;
    this.isCartEmpty = this.cart.length === 0;
    this.isCartNotEmpty = !this.isCartEmpty;
    var total = 0;
    this.cart.forEach((cartItem: CartItem) => {
      this.productService.getProductById(cartItem.productId)?.subscribe((product: Product) => {
        total += product.price * cartItem.quantity;
      });
    });
    this.cartTotal = total;
  }
}
