import { Injectable } from '@angular/core';
import { UserModel } from '../model/user.model';
import { Storage } from '@ionic/storage-angular'
import { Observable, from, BehaviorSubject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { application } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private authTokenKey = 'authToken';
  private userKey = 'user';
  private authStatusSubject = new BehaviorSubject<boolean>(false);

  constructor(private storage: Storage) {
    this.initStorage();
    this.initAuthStatus();
  }
  getAuthToken(): Promise<string | null> {
    return this.storage.get(this.authTokenKey);
  }
  async initAuthStatus() {
    const authToken = await this.storage.get(this.authTokenKey);
    this.isAuthenticated = !!authToken;
  }
  async initStorage() {
    await this.storage.create();
  }
  async login(username: string, password: string): Promise<boolean> {
    const url = 'http://127.0.0.1:5000/login'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': username,
        'password': password
      })
    })

    if (response.ok) {
      this.isAuthenticated = true
      const responseBody = await response.json(); 
      const authToken = responseBody.token; 
      const user = new UserModel(1, username, authToken)
      await Promise.all([
        this.storage.set(this.authTokenKey, authToken),
        this.storage.set(this.userKey, user)
      ]);
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
  getUserName(): Observable<UserModel | null> {
    return from(this.storage.get(this.userKey)).pipe(
      switchMap((userData) => {
        if (userData) {
          return of(userData);
        } else {
          return of<UserModel | null>(null);
        }
      })
    );
  }


  authStatusChanged$: Observable<boolean> = this.authStatusSubject.asObservable();
  async isTokenValid(): Promise<boolean> {
    const authToken = await this.storage.get(this.authTokenKey);
    return !!authToken;
  }
  async logout(): Promise<void> {
    this.isAuthenticated = false;
    await Promise.all([
      this.storage.remove(this.authTokenKey),
      this.storage.remove(this.userKey),
    ]);
  }
  async clearStorage(): Promise<void> {
    await this.storage.clear();
  }

}



