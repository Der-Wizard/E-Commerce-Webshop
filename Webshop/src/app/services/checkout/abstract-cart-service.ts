import { BehaviorSubject, Observable } from "rxjs";
import { CartItem } from "./models/cart-item";

export abstract class CartService {
    abstract cart$: BehaviorSubject<CartItem[]>;
    abstract cartLength$: BehaviorSubject<number>;
    abstract cartTotal$: BehaviorSubject<number>;
    abstract isCartEmpty$: BehaviorSubject<boolean>;
    abstract isCartNotEmpty$: BehaviorSubject<boolean>;

    abstract add(id: string, quantity: number): void;
    abstract remove(id: string): void;
    abstract changeQuantityBy(id:string, delta:number): void;
    abstract clear(): void;
    abstract getCartItemTotal(id:string): Observable<number>;
}