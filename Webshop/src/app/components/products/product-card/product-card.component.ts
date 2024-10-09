import { Component, Input } from '@angular/core';
import { Product } from '../../../services/product/models/product';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CurrentStockComponent } from '../current-stock/current-stock.component';
import { WareHouseService } from '../../../services/warehouse/warehouse-service';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [CurrencyPipe, RouterLink,
    CurrentStockComponent, AsyncPipe
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

  constructor(public wareHouseService: WareHouseService) {}
}