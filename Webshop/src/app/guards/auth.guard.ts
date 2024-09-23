import { CanActivateFn } from '@angular/router';
import { AccountAuthService } from '../../app/services/account-auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AccountAuthService);
  return authService.isLoggedIn();
};
