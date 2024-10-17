import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { DummyAccountAuthService } from '../services/auth/dummy-account-auth.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(DummyAccountAuthService);
  return !authService.isLoggedIn();
};
