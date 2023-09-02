import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private authSubscription: Subscription | undefined;
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.authService.getAuthToken().then(authToken => {
      if (authToken) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login']);
      }
    });

  }
}
