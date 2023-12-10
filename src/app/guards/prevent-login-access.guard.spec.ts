import { TestBed } from '@angular/core/testing';

import { PreventLoginAccessGuard } from './prevent-login-access.guard';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

describe('PreventLoginAccessGuard', () => {
  let guard: PreventLoginAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { isLoggedIn: () => of(false) } }
      ]
    });
    guard = TestBed.inject(PreventLoginAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
