import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../../services/data/abstract-product-service';
import { environment } from '../../../../../environments/environment';
import { ApiProductService } from '../../../../services/data/api-product.service';
import { DummyProductService } from '../../../../services/data/dummy-product.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
  ], 
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  private router = inject(Router);
  productService: ProductService;

  constructor(p_productService: ProductService) {
    this.productService = p_productService;
  }
  onSearch() {
    this.router.navigate(['/products'], { queryParams: { search: this.productService.searchTerm } });
  }

  onSearchTermChanged(newValue: string) {
    console.log(newValue);
    this.productService.searchTerm = newValue;
  }
}
