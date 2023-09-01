import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../model/user.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: UserModel | null = null;
  constructor(private authService: AuthService) {
  }
  ngOnInit() {
    this.authService.getUserName().pipe(
      switchMap((user) => {
        if (user) {
          console.log(user.username);
          this.user = user;
        }
        return of(user);
      })
    ).subscribe();
  }

}
