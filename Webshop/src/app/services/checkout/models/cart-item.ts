
export class CartItem {
    productId!: string;
    quantity!: number;
    total!: number;

    constructor(_productId: string, _quantity: number) {
        this.quantity = _quantity;
        this.productId = _productId;
    }
}