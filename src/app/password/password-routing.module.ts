import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordPage } from './password.page';
import { LoginPage } from '../login/login.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordPage
  }, 
  {
    path: 'login', 
    component: LoginPage
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordPageRoutingModule {}
