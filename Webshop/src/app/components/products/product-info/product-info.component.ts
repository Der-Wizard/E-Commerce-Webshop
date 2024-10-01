import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../services/data/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/data/abstract-product-service';
import { CurrencyPipe, NgFor, NgForOf, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from "../product-card/product-card.component";
import { CurrentStockComponent } from '../current-stock/current-stock.component';
import { CartService } from '../../../services/checkout/cart.service';
import { AuthLoggedInDirective } from '../../../directives/auth-logged-in.directive';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgFor, NgForOf,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    ProductCardComponent,
    CurrentStockComponent,
    AuthLoggedInDirective
  ],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss'
})
export class ProductInfoComponent implements OnInit {
  selectedQuantity!: number;

  productId: string | null | undefined = '';
  product!: Product;
  private router = inject(Router);

  constructor(private route: ActivatedRoute, private cartService: CartService, private productService: ProductService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      this.loadProductDetails();
      this.selectedQuantity = this.product.stock > 0 ? 1 : 0;
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

  onSubmit() {
    if (this.selectedQuantity == 0 || this.product.stock < this.selectedQuantity) {
      return;
    }

    this.cartService.addItemToCart(this.product.id,this.selectedQuantity);
    this.router.navigate(['cart']);

  }
  generateStockArray(stock: number): number[] {
    const maxLimit = 30;
    const arr = Array(Math.min(stock, maxLimit)).fill(0).map((_, i) => i + 1);
    return arr;
  }
}
