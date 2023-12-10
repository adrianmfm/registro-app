import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Storage } from '@ionic/storage-angular';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { 
          provide: Storage, 
          useValue: {
            create: () => Promise.resolve(), // Añade esta línea
            get: () => Promise.resolve(), // Añade esta línea si usas el método get
          } 
        }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});