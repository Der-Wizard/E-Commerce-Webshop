
export class CartItem {
    productId!: string;
    quantity!: number;
    total!: number;

    constructor(_productId: string, _quantity: number, total: number) {
        this.quantity = _quantity;
        this.productId = _productId;
        this.total = total;
    }
}