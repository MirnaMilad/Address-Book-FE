import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedValue = false;

   // Assume you have a method to set the authentication status
   setAuthenticated(status: boolean): void {
    this.isAuthenticatedValue = status;
  }

  // Assume you have a method to get the authentication status
  isAuthenticated(): boolean {
    return this.isAuthenticatedValue;
  }
}
