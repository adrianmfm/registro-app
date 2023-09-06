import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string;
  contrasena: string;
  showSpinner: boolean = false;
  field: string = "";

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private authService: AuthService,
    private alertController: AlertController) {
    this.usuario = '';
    this.contrasena = '';
  }

  ngOnInit() {
    this.authService.getUserName().subscribe(user => {
      if (user) {
        console.log(user.username)
      }
    })
  }

  async presentErrorAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


  async ingresar() {
    if (!this.validateModel({ usuario: this.usuario, contrasena: this.contrasena })) {
      return;
    }

    if (this.usuario.endsWith("@duocuc.cl")) {
      this.field = '';
      this.showLoading();
      const isAuthenticated = await this.authService.login(this.usuario, this.contrasena);
      this.showLoading();
      await new Promise(resolve => setTimeout(resolve, 500));

      if (isAuthenticated) {
        await this.router.navigate(['/home']);
      }

      await this.loadingController.dismiss();
    } else {
      await this.presentErrorAlert('Error', 'Ingrese un correo electrónico válido.');
    }
  }



  validateModel(model: any) {
    // Recorro todas las entradas que me entrega Object entries y obtengo su clave, valor
    for (var [key, value] of Object.entries(model)) {
      // Si un valor es "" se retornara false y se avisara de lo faltante
      if (value == "") {
        // Se asigna el campo faltante
        this.field = key;
        // Se retorna false
        return false;
      }
    }
    return true;
  }
  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      duration: 500,
    });

    await loading.present();
  }
}
