import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ProductService } from './services/product/abstract-product-service';
import { DummyCartService } from './services/cart/dummy-cart.service';
import { CheckOutDirective } from './directives/checkout/check-out.directive';
import { CartService } from './services/cart/abstract-cart-service';
import { DummyProductService } from './services/product/dummy-product.service';
import { WareHouseService } from './services/warehouse/warehouse-service';
import { DummyWarehouseService } from './services/warehouse/dummy-warehouse.service';
import { NewsletterService } from './services/newsletter/newsletter-service';
import { ApiNewsletterService } from './services/newsletter/api-newsletter.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink,
    FooterComponent, HeaderComponent,
    CheckOutDirective,
  ],
  providers: [
    {
      provide: ProductService,
      useClass: DummyProductService
    },
    {
      provide: CartService,
      useClass: DummyCartService
    }, 
    {
      provide: WareHouseService,
      useClass: DummyWarehouseService
    }, 
    {
      provide: NewsletterService,
      useClass: ApiNewsletterService
    }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'App';
}
