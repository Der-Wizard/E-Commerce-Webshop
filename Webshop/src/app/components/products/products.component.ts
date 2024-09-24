import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    <div class="product-container" #productContainer>
      <!-- Product cards will be dynamically inserted here -->
    </div>
  `,
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('productContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  ngOnInit(): void {
    this.dummy_renderProductCards();
  }

  dummy_renderProductCards(): void {
    this.container.clear();
    for (let i = 0; i < 100; i++) {
      this.container.createComponent(ProductCardComponent);
    }
  }
}
