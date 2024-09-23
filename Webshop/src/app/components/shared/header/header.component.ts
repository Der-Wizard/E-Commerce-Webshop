import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthLoggedInDirective } from '../../../directives/auth-logged-in.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    AuthLoggedInDirective
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
