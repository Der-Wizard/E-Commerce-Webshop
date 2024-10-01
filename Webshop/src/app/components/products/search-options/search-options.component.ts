import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ProductService } from '../../../services/data/abstract-product-service';
import { FormsModule } from '@angular/forms';
import { DropDownBulletPointComponent } from './drop-down-bullet-point/drop-down-bullet-point.component';

@Component({
  selector: 'app-search-options',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    CommonModule,
    DropDownBulletPointComponent
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

  constructor(public productService: ProductService) {}

  onCategoryChange() {
    this.onCriteriaChanged.emit();
  }
}
