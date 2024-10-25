import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { ProductService } from './services/product/abstract-product-service';
import { DummyProductService } from './services/product/dummy-product.service';
import { CartService } from './services/cart/abstract-cart-service';
import { DummyCartService } from './services/cart/dummy-cart.service';
import { WareHouseService } from './services/warehouse/warehouse-service';
import { DummyWarehouseService } from './services/warehouse/dummy-warehouse.service';
import { NewsletterService } from './services/newsletter/newsletter-service';
import { ApiNewsletterService } from './services/newsletter/api-newsletter.service';
import { AccountAuthService } from './services/auth/account-auth-service';
import { ApiAccountAuthService } from './services/auth/api-account-auth.service';
import { DummyAccountAuthService } from './services/auth/dummy-account-auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideAnimationsAsync(),
    provideHttpClient(),
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
  ]
};