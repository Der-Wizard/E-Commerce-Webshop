import { CanActivateFn, Router } from '@angular/router';
import { AccountAuthService } from '../../app/services/auth/account-auth-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AccountAuthService);
  const router = inject(Router);
  const loggedIn = authService.isLoggedIn();

  if (loggedIn) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
