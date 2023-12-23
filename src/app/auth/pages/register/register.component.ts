import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm;
  constructor(
    private registerService: RegisterService,
    private router: Router,
    private toastr: ToastrService,
    private authService : AuthService
  ) {
    this.registerForm = this.registerService.registerForm;
  }

  ngOnInit(): void {}

  register(reqBody) {
    this.registerService.register(reqBody).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res['token']);
        this.router.navigate['/dashboard'];
        this.authService.setAuthenticated(true);
      },
      (error) => {
        this.toastr.error(error.error.message);
        if (error.error.message === 'This email is Already exists') {
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
