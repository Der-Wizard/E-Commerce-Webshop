import { Component, inject } from '@angular/core';
// import { AccountAuthService } from '../../services/auth/account-auth-service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  // constructor(private authService: AccountAuthService) {

  // }

  logout() {
    // this.authService.logout();
  }

}
