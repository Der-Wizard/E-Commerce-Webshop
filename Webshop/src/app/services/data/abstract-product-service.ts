import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "./models/product";

export abstract class ProductService {
    protected abstract filteredProducts: Product[];
    protected abstract pageSize: number;
    protected abstract searchTerm: string;
    protected abstract searchCategory: string;

    abstract page$: BehaviorSubject<number>;
    abstract pageCount$: BehaviorSubject<number>;
    abstract currentProducts$: BehaviorSubject<Product[]>;

    abstract decreasePageIndex(): void;
    abstract setPageIndex(value: number): void;
    abstract increasePageIndex(): void;
    abstract setPageSize(value: number): void;
    abstract getSearchTerm(): string;
    abstract setSearchTerm(value: string): void;
    abstract setSearchCategory(value: string): void;
    abstract getProductById(id: string): Observable<Product | undefined>;

    abstract search(): void;

    protected abstract fetchProducts(): Observable<Product[]>;
    protected abstract fetchProductById(id: string): Observable<Product | undefined>;
}