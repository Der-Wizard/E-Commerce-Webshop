import { Component } from '@angular/core';
import { AuthLoggedInDirective } from '../../../directives/auth-logged-in.directive';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { RouterLink } from '@angular/router';
import { ToggleLightModeComponent } from './toggle-light-mode/toggle-light-mode.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    AuthLoggedInDirective,
    SearchBarComponent,
    ToggleLightModeComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
}
