import { Observable } from "rxjs";
import { Product } from "./models/product";

export abstract class ProductService {
    abstract fetchProducts(searchTerm: string, page: number, pageSize: number) : Observable<[Product[],number]>;
    abstract getProductById(id: number): Observable<Product> | undefined;
}