import { Observable } from "rxjs";
import { Product } from "./models/product";

export abstract class ProductService {
    abstract getProducts(page: number, pagesize: number): Observable<Product[]>;
    abstract getProductById(id: number): Observable<Product> | undefined;
}