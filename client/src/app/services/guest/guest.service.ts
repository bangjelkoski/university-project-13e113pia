import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './../auth/auth.service';

@Injectable()
export class GuestService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.loggedIn()) {
      return true;
    }

    const user = this.authService.user();

    return this.router.navigate([`/${user.role}`], {
      queryParams: {
        return: state.url,
      },
    });
  }
}
