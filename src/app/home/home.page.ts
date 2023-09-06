import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../model/user.model';
import { switchMap } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any;
  constructor(private authService: AuthService,
    private alertController: AlertController,
    private router: Router) {
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
      } else {
        this.router.navigate(['/login']);
      }
    })
  }
  async logout() {
    const confirmAlert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Estas seguro que quieres salir',
      buttons: [{
        text: 'no',
        role: 'cancel',
      },
      {
        text: 'Cerrar Sesion',
        handler: async () => {
          await this.authService.logout();
          await this.authService.clearStorage();
          await this.router.navigate(['/login']);
        }
      }]

    });
    await confirmAlert.present();
  }


}
