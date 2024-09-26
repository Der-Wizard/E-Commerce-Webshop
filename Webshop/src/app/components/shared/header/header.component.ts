import { Component } from '@angular/core';
import { AuthLoggedInDirective } from '../../../directives/auth-logged-in.directive';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    AuthLoggedInDirective,
    SearchBarComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
}
