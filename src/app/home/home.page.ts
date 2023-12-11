import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {Camera,CameraResultType,CameraSource} from '@capacitor/camera';
import jsQR from 'jsqr';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild('videoElement') videoElement: any;
  user: any;
  latestQRCode: any = null;
  constructor(private authService: AuthService,
    private alertController: AlertController,
    private router: Router) {
    this.authService.getUserName().subscribe(user => {
      if (user) {
        this.user = user
      }
    }) 
  }
  ngAfterViewInit() {
    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => {
          video.srcObject = stream;
          requestAnimationFrame(scanQRCode);
        })
        .catch(err => {
          console.error("Error accessing the camera", err);
        });
    }
    const scanQRCode = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        if (context) {
          canvas.height = video.videoHeight;
          canvas.width = video.videoWidth;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });
          if (qrCode) {
            console.log("QR Code detected: ", qrCode.data);
            this.latestQRCode = qrCode.data;
          }
          requestAnimationFrame(scanQRCode);
        }
      } else {
        requestAnimationFrame(scanQRCode);
      }
    };
  }
  
  enableButton() {
    throw new Error('Method not implemented.');
  }
  ngOnInit() { }

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
  async sendData() {
    try {
      console.log(this.latestQRCode);
      await this.authService.sendData(this.latestQRCode, this.user.token);
  
      const successAlert = await this.alertController.create({
        header: 'Exito',
        message: 'Datos enviados correctamente',
        buttons: ['OK']
      });
      await successAlert.present();
    } catch (error) {
      const errorAlert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al enviar los datos',
        buttons: ['OK']
      });
      await errorAlert.present();
    }
  }

}
