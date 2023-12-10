import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Storage } from '@ionic/storage-angular';

describe('AuthGuardGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    const storageSpy = jasmine.createSpyObj('Storage', ['create', 'get']);
    storageSpy.create.and.returnValue(Promise.resolve());
    storageSpy.get.and.returnValue(Promise.resolve());

    TestBed.configureTestingModule({
      providers: [
        { provide: Storage, useValue: storageSpy }
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});