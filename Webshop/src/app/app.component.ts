import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ProductService } from './services/data/abstract-product-service';
import { environment } from '../environments/environment';
import { ApiProductService } from './services/data/api-product.service';
import { DummyProductService } from './services/data/dummy-product.service';
import { CartService } from './services/checkout/cart.service';
import { CheckOutDirective } from './directives/checkout/check-out.directive';

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
      useClass: environment.production ? ApiProductService : DummyProductService,
    },
    {
      provide: CartService,
      useClass: CartService
    }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'App';
}
