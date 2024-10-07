import { Observable } from "rxjs";
import { CartItem } from "./models/cart-item";

export abstract class CartService {
    abstract cart: CartItem[];
    abstract cartLength: number;
    abstract cartTotal: number;
    abstract isCartEmpty: boolean;
    abstract isCartNotEmpty: boolean;

    abstract getCartItemTotal(id: string): Observable<number>;

    abstract add(id: string, quantity: number): void;
    abstract remove(id: string): void;
    abstract changeQuantityBy(id:string, delta:number): void;
    abstract setQuantity(id:string, quantity:number): void;
    abstract clear(): void;
}