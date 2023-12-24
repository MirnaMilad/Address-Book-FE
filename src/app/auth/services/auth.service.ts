import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedInSubject = new BehaviorSubject<boolean>(false);
  private isAuthenticatedValue = false;

  get isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

   // Assume you have a method to set the authentication status
   setAuthenticated(status: boolean): void {
    this.isAuthenticatedValue = status;
  }

  // Assume you have a method to get the authentication status
  isAuthenticated(): boolean {
    return this.isAuthenticatedValue;
  }
}
