import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../model/user.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any;
  constructor(private authService: AuthService) {
    this.authService.getUserName().subscribe(user => {
      if (user) {
        this.user = user
      }
    })

  }
  ngOnInit() {
    this.authService.getUserName().subscribe(user => {
      if (user) {
        console.log(user.username)
      }
    })



  }


}
