import { Component, Input } from '@angular/core';
import { Product } from '../../../services/data/models/product';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CurrentStockComponent } from '../current-stock/current-stock.component';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [CurrencyPipe, RouterLink,
    CurrentStockComponent
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product: Product = {
    id: '',
    name: '',
    description: '',
    price: 0,
    category: ''
  };
}