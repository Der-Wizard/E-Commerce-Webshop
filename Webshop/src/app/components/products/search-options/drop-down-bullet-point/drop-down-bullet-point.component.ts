import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../../../services/data/abstract-product-service';

@Component({
  selector: 'app-drop-down-bullet-point',
  standalone: true,
  imports: [
    NgIf,
  ],
  templateUrl: './drop-down-bullet-point.component.html',
  styleUrl: './drop-down-bullet-point.component.scss'
})
export class DropDownBulletPointComponent {
  @Output() onSelectOption = new EventEmitter();
  productService: ProductService;

  constructor(p_productService: ProductService){
    this.productService = p_productService;
  }

  selectingOption(option: string) {
    this.productService.searchCategory = option;
    this.onSelectOption.emit();
  }
}
