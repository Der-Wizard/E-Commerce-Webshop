import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductService } from '../../services/data/abstract-product-service';
import { CommonModule } from '@angular/common';
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
  private lastPageSize: number = 0;

  constructor(public productService: ProductService) {}

  private resizeTimeout: any;
  
  ngOnInit(): void {
    this.getPageSizeBasedOnScreenSize();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  getPageSizeBasedOnScreenSize() {
    var screenWidth = document.documentElement.clientWidth;
    var newPageSize: number;

    if (screenWidth < 400) {
      newPageSize = 15;
    } else if (screenWidth > 400 && screenWidth < 600) {
      newPageSize = 25;
    } else {
      newPageSize = 50;
    }

    if(newPageSize === this.lastPageSize)
      return;

    this.lastPageSize = newPageSize;
    this.productService.setPageSize(newPageSize);
  }

  private onResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.getPageSizeBasedOnScreenSize();
    }, 400);
  }

}
