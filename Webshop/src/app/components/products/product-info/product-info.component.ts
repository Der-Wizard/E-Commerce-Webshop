import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../services/product/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product/abstract-product-service';
import { CurrencyPipe, NgFor, NgForOf, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from "../product-card/product-card.component";
import { CurrentStockComponent } from '../current-stock/current-stock.component';
import { AuthLoggedInDirective } from '../../../directives/auth-logged-in.directive';
import { CartService } from '../../../services/cart/abstract-cart-service';
import { WareHouseService } from '../../../services/warehouse/warehouse-service';
import { map } from 'rxjs';

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
export class ProductInfoComponent {
  selectedQuantity: number = 0;

  productId: string = '';
  product!: Product;

  stockArray: number[] = [];
  currentStock: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private cartService: CartService, private productService: ProductService,
    private wareHouseService: WareHouseService
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') ?? '';
      this.loadProductDetails();
      this.wareHouseService.getAvailableStock(this.productId).subscribe((stock) => {
        this.selectedQuantity = stock > 0 ? 1 : 0;

        const maxLimit = 30;
        const arr = Array(Math.min(stock, maxLimit)).fill(0).map((_, i) => i + 1);
        this.stockArray = arr;
        this.currentStock = stock;
      });
    });
  }

  loadProductDetails() {
    if (!this.productId) {
      this.router.navigate(['not-found']);
      return;
    }

    var observableProduct = this.productService.getProductById(this.productId);

    observableProduct.subscribe((product: Product | undefined) => {
      if (product === undefined) {
        this.router.navigate(['not-found']);
        return;
      }
      this.product = product;
    });
  }

  onSubmit() {
    this.wareHouseService.getAvailableStock(this.productId).subscribe((stock) => {
      this.selectedQuantity = Number(this.selectedQuantity);
      if (this.selectedQuantity === 0 || stock < this.selectedQuantity) {
        return;
      }
      this.cartService.add(this.product.id, this.selectedQuantity);
      this.router.navigate(['cart']);
    });

  }
}
