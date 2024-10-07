import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { Product } from '../../services/data/models/product';
import { ProductService } from '../../services/data/abstract-product-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SearchCarouselComponent } from './search-carousel/search-carousel.component';
import { SearchOptionsComponent } from './search-options/search-options.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent,
    CommonModule,
    SearchCarouselComponent,
    SearchOptionsComponent
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  private pageSize: number = 50;
  private resizeTimeout: any;

  productService: ProductService;

  filteredProducts: Product[] = [];
  current_page_index: number = 1;
  maximum_page_index: number = 1;

  constructor(private route: ActivatedRoute, p_productService: ProductService) {
    this.productService = p_productService;
   }

  getPageSizeBasedOnScreenSize() {
    var screenWidth = document.documentElement.clientWidth;

    if (screenWidth < 400) {
      this.pageSize = 15;
    } else if (screenWidth > 400 && screenWidth < 600) {
      this.pageSize = 25;
    } else {
      this.pageSize = 50;
    }

    this.productService.fetchProductPageCount(this.pageSize).subscribe((pageCount) => {
      if (this.current_page_index > pageCount) {
        this.current_page_index = pageCount;
      }
      this.handlePageChange(this.current_page_index);
    });

  }

  private onResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.getPageSizeBasedOnScreenSize();
    }, 400);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.productService.searchTerm = params['search'] || '';
      this.current_page_index = 1;
      this.onSearch();
    });
    this.getPageSizeBasedOnScreenSize();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onSearch() {
    this.productService.fetchProductPageCount(this.pageSize).subscribe((pageCount) => {
      if (this.current_page_index > pageCount) {
        this.current_page_index = pageCount;
      }
      if (this.current_page_index < 1 && pageCount > 0) {
        this.current_page_index = 1;
      }
    });
    this.productService
      .fetchProducts(this.current_page_index, this.pageSize)
      .subscribe(([products, max_page_index]) => {
        this.filteredProducts = products;
        this.maximum_page_index = max_page_index;
      });
  }

  handlePageChange(newPageIndex: number) {
    this.current_page_index = newPageIndex;
    this.onSearch();
  }
}
