
export class CartItem {
    id!: string;
    quantity!: number;

    constructor(_productId: string, _quantity: number) {
        this.quantity = _quantity;
        this.id = _productId;
    }
}