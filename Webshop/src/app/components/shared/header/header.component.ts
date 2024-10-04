import { Component } from '@angular/core';
import { AuthLoggedInDirective } from '../../../directives/auth-logged-in.directive';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ToggleLightModeComponent } from './toggle-light-mode/toggle-light-mode.component';
import { NavLinkComponent } from './nav-link/nav-link.component';
import { CartService } from '../../../services/checkout/cart.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    AuthLoggedInDirective,
    SearchBarComponent,
    ToggleLightModeComponent,
    NavLinkComponent,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public cartService: CartService) {}
}
