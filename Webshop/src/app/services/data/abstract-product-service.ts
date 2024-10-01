import { Observable } from "rxjs";
import { Product } from "./models/product";

export abstract class ProductService {
    abstract searchTerm: string;
    abstract searchCategory: string;

    abstract fetchProductPageCount(pageSize: number) : Observable<number>;
    abstract fetchProducts(page: number, pageSize: number) : Observable<[Product[],number]>;
    abstract getProductById(id: string): Observable<Product> | undefined;
}