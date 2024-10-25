import { Component } from '@angular/core';
import { ProductService } from '../../../services/product/abstract-product-service';

@Component({
  selector: 'app-search-options',
  standalone: true,
  imports: [],
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.scss'],
})
export class SearchOptionsComponent {
  constructor(private productService: ProductService) {}

  selectingOption(option: string) {
    this.productService.setSearchCategory(option);
  }
}
