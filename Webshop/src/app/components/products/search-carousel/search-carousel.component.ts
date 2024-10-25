import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../../../services/product/abstract-product-service';

@Component({
  selector: 'app-search-carousel',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './search-carousel.component.html',
  styleUrls: ['./search-carousel.component.scss'],
})
export class SearchCarouselComponent {
  constructor(public productService: ProductService) {}

  decrease_page_index() {
    this.productService.decreasePageIndex();
  }

  increase_page_index() {
    this.productService.increasePageIndex();
  }

  skipToSearch(byOffset: number) {
    var page = this.productService.page$.value + byOffset;
    this.productService.setPageIndex(page);
  }
}
