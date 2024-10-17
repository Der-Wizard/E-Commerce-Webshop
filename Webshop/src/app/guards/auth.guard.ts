import { CanActivateFn } from '@angular/router';
import { AccountAuthService } from '../../app/services/auth/account-auth-service';
import { inject } from '@angular/core';
import { DummyAccountAuthService } from '../services/auth/dummy-account-auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(DummyAccountAuthService);
  return authService.isLoggedIn();
};
