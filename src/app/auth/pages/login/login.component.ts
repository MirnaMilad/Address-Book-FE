import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { LoginResponse } from '../../models/loginResponse';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private authService : AuthService
  ) {
    this.loginForm = this.loginService.loginForm;
  }

  login(reqBody) {
    this.loginService.login(reqBody).subscribe(
      (res: LoginResponse) => {
        localStorage.setItem('token', res['token']);
        this.router.navigate(['/dashboard']);
        this.authService.setAuthenticated(true);
        this.authService.loggedInSubject.next(true);
      },
      (error) => this.toastr.error('Invalid Email or Password')
    );
  }
}
