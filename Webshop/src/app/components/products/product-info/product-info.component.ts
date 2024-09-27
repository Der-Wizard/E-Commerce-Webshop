import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../services/data/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/data/abstract-product-service';
import { environment } from '../../../../environments/environment';
import { ApiProductService } from '../../../services/data/api-product.service';
import { DummyProductService } from '../../../services/data/dummy-product.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  providers: [
    {
      provide: ProductService,
      useClass: environment.production ? ApiProductService : DummyProductService,
    },
  ],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss'
})
export class ProductInfoComponent implements OnInit {
  productId: string | null | undefined = '';
  product!: Product;
  private productService = inject(ProductService);
  private router = inject(Router);

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      this.loadProductDetails();
    });
  }

  loadProductDetails() {
    if (!this.productId) {
      this.router.navigate(['not-found']);
      return;
    }

    var observableProduct = this.productService.getProductById(this.productId);

    if (!observableProduct) {
      this.router.navigate(['not-found']);
      return;
    }

    observableProduct.subscribe((product: Product) => {
      this.product = product;
    })
  }
}
