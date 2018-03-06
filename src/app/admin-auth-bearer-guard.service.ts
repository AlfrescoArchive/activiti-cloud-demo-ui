import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './auth/authentication.service';

@Injectable()
export class AdminAuthBearerGuard implements CanActivate {
  constructor(private authService: AuthenticationService,
    protected router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin(state.url);
  }

  checkLogin(redirectUrl: string): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
