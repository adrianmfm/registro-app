import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

describe('LoginPage Methods', () => {
  let component: LoginPage;
  let routerSpy: Router, loadingControllerSpy: LoadingController, authServiceSpy: AuthService, alertControllerSpy: AlertController;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    loadingControllerSpy = jasmine.createSpyObj('LoadingController', ['create']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    component = new LoginPage(routerSpy, loadingControllerSpy, authServiceSpy, alertControllerSpy);
    alertControllerSpy.create = jasmine.createSpy().and.returnValue(Promise.resolve({ present: () => {} }));
  });

  it('should present error alert', waitForAsync(async () => {
    const header = 'Test Header';
    const message = 'Test Message';
    const alertMock = {
      present: () => Promise.resolve()
    };
    const alertControllerMock = {
      create: () => Promise.resolve(alertMock)
    };

    alertControllerSpy.create = jasmine.createSpy().and.callFake(alertControllerMock.create);
    await component.presentErrorAlert(header, message);
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: header,
      message: message,
      buttons: ['OK']
    });
  }));

  it('should validate model', () => {
    const model = { usuario: 'test', contrasena: 'test' };
    expect(component.validateModel(model)).toBeTrue();
    const modelWithEmptyField = { usuario: '', contrasena: 'test' };
    expect(component.validateModel(modelWithEmptyField)).toBeFalse();
  });


});