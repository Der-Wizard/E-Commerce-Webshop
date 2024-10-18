import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountAuthService } from '../services/auth/account-auth-service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AccountAuthService);
  const router = inject(Router);
  const loggedIn = !authService.isLoggedIn();

  if (loggedIn) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
