import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Corrected import
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PasswordPageRoutingModule } from './password-routing.module';
import { PasswordPage } from './password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule, 
    PasswordPageRoutingModule
  ],
  declarations: [PasswordPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // This allows the use of custom elements
})
export class PasswordPageModule {}
