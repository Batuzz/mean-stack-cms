import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor() { }

  // Don't let user go on login page while he's logged in.
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return !localStorage.getItem('user');
  }
}
