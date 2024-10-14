import { Injectable } from '@angular/core';
import { ProductService } from './abstract-product-service';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Product } from './models/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiProductService extends ProductService {
  protected override pageSize: number = 50;
  protected override searchTerm: string = '';
  protected override searchCategory: string = '';

  override page$ = new BehaviorSubject<number>(1);
  override pageCount$ = new BehaviorSubject<number>(1);
  override currentProducts$ = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) { super(); }

  override decreasePageIndex(): void {
    if (this.page$.value <= 1) {
      this.page$.value === 1;
      return;
    }
    this.page$.next(this.page$.value - 1)
    this.updateCurrentProducts();
  }
  override setPageIndex(value: number): void {
    if (value < 1 || value > this.pageCount$.value) {
      return;
    }
    this.page$.next(value);
    this.updateCurrentProducts();
  }
  override increasePageIndex(): void {
    if (this.page$.value >= this.pageCount$.value) {
      this.page$.value === this.pageCount$.value;
      return;
    }
    this.page$.next(this.page$.value + 1)
    this.updateCurrentProducts();
  }
  override setPageSize(value: number): void {
    this.pageSize = value;
    this.updateCurrentProducts();
  }
  override getSearchTerm(): string {
    return this.searchTerm;
  }
  override setSearchTerm(value: string): void {
    this.searchTerm = value;
    this.updateCurrentProducts();
  }
  override setSearchCategory(value: string): void {
    this.searchCategory = value;
    this.updateCurrentProducts();
  }
  override getProductById(id: string): Observable<Product | undefined> {
    return this.fetchProductById(id).pipe(
      map(product => product)
    );
  }
  override search(): void {
    this.updateCurrentProducts();
  }
  protected override fetchProducts(): Observable<Product[]> {
    const url = `${environment.apiUrl}/get_products.php`;
    const params = {
      page: this.page$.value,
      pageSize: this.pageSize,
      searchTerm: this.searchTerm,
      searchCategory: this.searchCategory
    }
    return this.http.get<Product[]>(url, { params }).pipe(
      catchError(error => {
        console.error('Error fetching products: ', error);
        return of([]);
      })
    )
  }
  protected override fetchProductById(id: string): Observable<Product | undefined> {
    const url = `${environment.apiUrl}/get_product.php`;
    const params = {
      id:id
    }

    return this.http.get<Product>(url, { params }).pipe(
      catchError(error => {
        console.error(`Error fetching product with ID ${id}: `, error);
        return of(undefined);
      })
    )
  }

  protected updateCurrentProducts(): void {
    this.fetchProducts()
    .subscribe({
      next: (products: Product[]) => {
        this.currentProducts$.next(products);
      },
      error: (error) => {
        console.error('Error updating current products:',error);
      }
    });
    this.fetchPageCount()
    .subscribe({
      next: (pageCount: number) => {
        this.pageCount$.next(pageCount);
        if(pageCount < this.page$.value)
          this.page$.next(pageCount);
        if(this.page$.value < 1)
          this.page$.next(1);
      },
      error: (error) => {
        console.error('Error fetching page count:', error);
      }
    })
  }

  private fetchPageCount(): Observable<number> {
    const url = environment.apiUrl + '/product_page_count.php';
    const params = {
      pageSize: this.pageSize,
      searchTerm: this.searchTerm,
      searchCategory: this.searchCategory
    };

    return this.http.get<number>(url, { params }).pipe(
      map((data: any) => {
        const parsedNumber = Number(data);
        if (isNaN(parsedNumber)) {
          throw new Error('Invalid data format');
        }
        return parsedNumber;
      }),
      catchError(error => {
        console.error('Error fetching page count:', error);
        return of(1);
      })
    );
  }
}
