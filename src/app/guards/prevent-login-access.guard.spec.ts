import { TestBed } from '@angular/core/testing';

import { PreventLoginAccessGuard } from './prevent-login-access.guard';

describe('PreventLoginAccessGuard', () => {
  let guard: PreventLoginAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventLoginAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
