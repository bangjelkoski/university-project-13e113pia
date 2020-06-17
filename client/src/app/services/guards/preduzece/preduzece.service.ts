import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Role } from 'src/types';

@Injectable()
export class PreduzeceGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.loggedIn()) {
      return true;
    }

    const korisnik = this.authService.korisnik();

    if (korisnik.role !== Role.preduzece) {
      return this.router.navigate([`/${korisnik.role}`], {
        queryParams: {
          return: state.url,
        },
      });
    }

    return false;
  }
}
