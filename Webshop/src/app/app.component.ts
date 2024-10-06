import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ProductService } from './services/data/abstract-product-service';
import { DummyCartService } from './services/checkout/dummy-cart.service';
import { CheckOutDirective } from './directives/checkout/check-out.directive';
import { CartService } from './services/checkout/abstract-cart-service';
import { DummyProductService } from './services/data/dummy-product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink,
    FooterComponent, HeaderComponent,
    CheckOutDirective
  ],
  providers: [
    {
      provide: ProductService,
      useClass: DummyProductService
    },
    {
      provide: CartService,
      useClass: DummyCartService
    }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'App';
}
