import { Component, inject } from '@angular/core';
import { AccountAuthService } from '../../services/account-auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  private authService = inject(AccountAuthService);

  logout() {
    this.authService.logout();
  }

}
