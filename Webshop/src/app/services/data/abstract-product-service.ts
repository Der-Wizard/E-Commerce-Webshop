import { Observable } from "rxjs";
import { Product } from "./models/product";

export abstract class ProductService {
    abstract fetchProductPageCount(searchTerm: string, pageSize: number) : Observable<number>;
    abstract fetchProducts(searchTerm: string, page: number, pageSize: number) : Observable<[Product[],number]>;
    abstract getProductById(id: string): Observable<Product> | undefined;
}