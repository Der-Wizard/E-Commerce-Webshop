import { CartItem } from "./models/cart-item";


export abstract class CartService {
    protected abstract cart: CartItem[];
    abstract isCartEmpty(): boolean;
    abstract isCartNotEmpty(): boolean;
    abstract getCart(): CartItem[];
    abstract getCartLength(): number;
    abstract getCartTotal(): number;
    abstract add(id: string, quantity: number): void;
    abstract remove(id: string): void;
    abstract changeQuantityBy(id:string, delta:number): void;
    abstract getQuantityOfId(id:string): number;
    abstract setQuantity(id:string, quantity:number): void;
    abstract clear(): void;
}