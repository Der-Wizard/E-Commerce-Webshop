import { Injectable } from '@angular/core';
import { ProductService } from './abstract-product-service';
import { Product } from './models/product';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiProductService extends ProductService{
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    super();
  }

  getProducts(page: number, pagesize: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> | undefined {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
