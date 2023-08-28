import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string;
  contrasena: string;
 
  field:string="";

  constructor(private router: Router) {
    this.usuario = '';
    this.contrasena = '';
  }
  
  
  ngOnInit() {
  }

  ingresar() {
    if (this.validateModel({ usuario: this.usuario, contrasena: this.contrasena })) {
      this.field = '';
      this.router.navigate(['/home']);

    }
  }
  validateModel(model:any){
    // Recorro todas las entradas que me entrega Object entries y obtengo su clave, valor
    for (var [key, value] of Object.entries(model)) {
      // Si un valor es "" se retornara false y se avisara de lo faltante
      if (value=="") {
        // Se asigna el campo faltante
        this.field=key;
        // Se retorna false
        return false;
      }
    }
    return true;
  }

}
