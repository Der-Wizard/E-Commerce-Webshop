import { Component, Input } from '@angular/core';
import { Product } from '../../../services/data/models/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
}