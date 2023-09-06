import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PreventLoginAccessGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    let isLoggedIn = false;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        isLoggedIn = this.authService.isAuthenticatedUser();
        if (isLoggedIn && event.url === '/login') {
          this.router.navigate(['/home']);
        }
      }
    });


    return !isLoggedIn;

  }
}