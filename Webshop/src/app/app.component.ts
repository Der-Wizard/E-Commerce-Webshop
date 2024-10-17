import { AfterViewInit, Component, ComponentFactoryResolver, HostListener, ViewChild, ViewContainerRef } from '@angular/core';
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
import { CustomAlertService } from './services/messages/custom-alert.service';
import { AccountAuthService } from './services/auth/account-auth-service';
import { DummyAccountAuthService } from './services/auth/dummy-account-auth.service';

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
    },
    {
      provide: AccountAuthService,
      useClass: DummyAccountAuthService
    }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{
  @ViewChild('alert_container', { read: ViewContainerRef, static: true}) alert_container!: ViewContainerRef;

  constructor(private alertService: CustomAlertService) { }

  ngAfterViewInit(): void {
    this.alertService.setContainer(this.alert_container);  
  }


}
