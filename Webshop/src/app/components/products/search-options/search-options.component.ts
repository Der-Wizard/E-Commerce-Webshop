import { Component, EventEmitter, Output } from '@angular/core';
import { ProductSortOrder } from '../../../services/data/models/product-sort-order';
import { CommonModule, NgFor } from '@angular/common';
import { ProductService } from '../../../services/data/abstract-product-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-options',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.scss'],
})
export class SearchOptionsComponent {
  @Output() onCriteriaChanged = new EventEmitter();

  categories: string[] = [
    '',
    'posters',
    'stickers',
    'pin sets',
    'clothing',
    'books',
    'videogames'
  ];

  sortingOptions = Object.keys(ProductSortOrder).filter(key => isNaN(Number(key)));

  constructor(public productService: ProductService) {}

  onSortingChange(newValue: string) {
    this.productService.sorting = ProductSortOrder[newValue as keyof typeof ProductSortOrder];
    this.onCriteriaChanged.emit();
  }

  onCategoryChange(newValue: string) {
    this.productService.searchCategory = newValue;
    this.onCriteriaChanged.emit();
  }
}
