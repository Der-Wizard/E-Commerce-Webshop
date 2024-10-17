import { Injectable } from '@angular/core';
import { CartItem } from './models/cart-item';
import { CartService } from './abstract-cart-service';
import { ProductService } from '../product/abstract-product-service';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { WareHouseService } from '../warehouse/warehouse-service';

@Injectable()
export class DummyCartService extends CartService {
  override cart$ = new BehaviorSubject<CartItem[]>([]);
  override cartLength$ = new BehaviorSubject<number>(0);
  override cartTotal$ = new BehaviorSubject<number>(0);
  override isCartEmpty$ = new BehaviorSubject<boolean>(false);
  override isCartNotEmpty$ = new BehaviorSubject<boolean>(false);

  private cartKey: string = '##local_dummy_cart##';

  constructor(private productService: ProductService, private wareHouseService: WareHouseService) {
    super();

    this.cart$.subscribe(array => {
      this.cartLength$.next(array.length);
      this.isCartEmpty$.next(array.length === 0);
      this.isCartNotEmpty$.next(array.length > 0);

      var total = 0;
      array.forEach(cartItem => {
        this.productService.getProductById(cartItem.productId).subscribe(product => {
          if (product === undefined)
            return;
          total += product.price * cartItem.quantity;
        });
      });
      this.cartTotal$.next(total);
    });

    this.readCartFromLocalStorage();
  }

  override add(id: string, quantity: number): void {
    const cart = [...this.cart$.value];
    const existentCartItemIndex = cart.findIndex(x => x.productId === id);
    if (existentCartItemIndex !== -1) {
      cart[existentCartItemIndex].quantity += quantity;

      this.cart$.next(cart);
      this.saveCart();
    }
    this.productService.getProductById(id).subscribe(product => {
      if (product === undefined)
        return;
      var total = quantity * product.price;
      cart.push(new CartItem(id, quantity, total));
      this.cart$.next(cart);
      this.saveCart();
    });

  }
  override remove(id: string): void {
    const cart = [...this.cart$.value];
    const existentCartItemIndex = cart.findIndex(x => x.productId === id);
    if (existentCartItemIndex !== -1) {
      cart.splice(existentCartItemIndex, 1);
      this.cart$.next(cart);
      this.saveCart();
    }
  }
  override changeQuantityBy(id: string, delta: number): void {
    const cart = [...this.cart$.value];
    const existentCartItemIndex = cart.findIndex(x => x.productId === id);
    if (existentCartItemIndex !== -1) {
      this.productService.getProductById(id).subscribe(product => {
        if (product === undefined)
          return;
        var quantity = cart[existentCartItemIndex].quantity + delta;
        this.wareHouseService.getAvailableStock(id).subscribe(currentStock => {
          if (quantity < 1)
            this.remove(id);

          if (quantity > currentStock)
            return;

          cart[existentCartItemIndex].quantity = quantity;
          var total = quantity * product.price;
          cart[existentCartItemIndex].total = total;
          this.cart$.next(cart);
          this.saveCart();
        })
      });
    }
  }
  override clear(): void {
    this.cart$.next([]);
    this.saveCart();
  }
  override getCartItemTotal(id: string): Observable<number> {
    const cart = [...this.cart$.value];
    const existentCartItemIndex = cart.findIndex(x => x.productId === id);
    if (existentCartItemIndex === -1)
      return of(-1);

    return this.productService.getProductById(id).pipe(map(product => {
      if (product === undefined) {
        return -1;
      }
      else {
        return product.price * cart[existentCartItemIndex].quantity;
      }
    }));
  }

  private readCartFromLocalStorage() {
    var localStorageCart = localStorage.getItem(this.cartKey);
    if (localStorageCart) {
      this.cart$.next(JSON.parse(localStorageCart));
    }
    else {
      this.saveCart();
    }
  }
  private saveCart(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart$.value));
  }
}
