import { Component, inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { Product } from '../../services/data/models/product';
import { environment } from '../../../environments/environment';
import { ApiProductService } from '../../services/data/api-product.service';
import { DummyProductService } from '../../services/data/dummy-product.service';
import { ProductService } from '../../services/data/product-service-interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent],
  providers: [
    {
      provide: ProductService,
      useClass: environment.production ? ApiProductService : DummyProductService
    }
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  @ViewChild('productContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  productService = inject(ProductService);

  ngOnInit(): void {
    this.renderProductCards();
  }

  renderProductCards(): void {
    this.container.clear();
    this.productService.getProducts(1,50).subscribe((products: Product[])=>{
      products.forEach((product: Product) => {
        console.log(product);
        const componentRef = this.container.createComponent(ProductCardComponent);
        componentRef.instance.product = product
      })
    })
  }
}
