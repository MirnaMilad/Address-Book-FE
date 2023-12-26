import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Check if the user is authenticated (e.g., if a token is present)
  isAuthenticated(): boolean {
    // Replace this with your actual authentication logic
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token is present, false otherwise
  }
}
