import { Component, inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { Product } from '../../services/data/models/product';
import { environment } from '../../../environments/environment';
import { ApiProductService } from '../../services/data/api-product.service';
import { DummyProductService } from '../../services/data/dummy-product.service';
import { ProductService } from '../../services/data/abstract-product-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  providers: [
    {
      provide: ProductService,
      useClass: environment.production ? ApiProductService : DummyProductService
    }
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  productService = inject(ProductService);

  filteredProducts: Product[] = [];
  searchTerm: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.onSearch();
    })
  }

  onSearch() {
    if (this.searchTerm) {
      this.productService.getProducts(1, 50).subscribe((products: Product[]) => {
        this.filteredProducts = products.filter(product =>
          product.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      });
    } else {
      this.productService.getProducts(1, 50).subscribe((products: Product[]) => {
        this.filteredProducts = products;
      });
    }
  }
}
