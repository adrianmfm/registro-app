import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage {
  email: string = '';

  constructor(private router: Router, private alertController: AlertController,) { }

  async sendRecoveryEmail() {
    if (!this.isValidEmail(this.email)) {
      await this.presentErrorAlert('Error', 'Ingrese un correo electrónico válido.');
      return;
    }

    setTimeout(async () => {
      await this.presentConfirmationAlert('Contraseña Enviada', 'Se ha enviado un correo de recuperación a tu dirección de correo electrónico.');
      this.router.navigate(['/login']);
    }, 1000);
  }

  isValidEmail(email: string): boolean {
    if (email.endsWith("@duocuc.cl")) {
      return true
    }
    return false;
  }


  async presentErrorAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentConfirmationAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
