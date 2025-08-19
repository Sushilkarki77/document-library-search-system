import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const loggedInGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
    const router = inject(Router);
    const isLoggedIn = authService.isLoggedIn();
    if (!isLoggedIn) {
        router.navigate(['login'])
    }
    return true;
};
