import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { StockEvaluationDirective } from '../../../directives/product/stock-evaluation.directive';

@Component({
  selector: 'product-current-stock',
  standalone: true,
  imports: [
    NgStyle,
    StockEvaluationDirective
  ],
  templateUrl: './current-stock.component.html',
  styleUrls: ['./current-stock.component.scss']
})
export class CurrentStockComponent {
  @Input() stock!: number;
}
