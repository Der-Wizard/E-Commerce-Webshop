import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ProductService } from './services/data/abstract-product-service';
import { environment } from '../environments/environment';
import { ApiProductService } from './services/data/api-product.service';
import { DummyProductService } from './services/data/dummy-product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink,
    FooterComponent, HeaderComponent,
  ],
  providers: [
    {
      provide: ProductService,
      useClass: environment.production ? ApiProductService : DummyProductService,
    },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'App';
}
