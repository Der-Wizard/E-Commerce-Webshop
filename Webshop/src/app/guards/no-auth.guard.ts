import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountAuthService } from '../services/account-auth.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AccountAuthService);
  return !authService.isLoggedIn();
};
