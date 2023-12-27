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
    private toastr: ToastrService
  ) {
    this.registerForm = this.registerService.registerForm;
  }

  ngOnInit(): void {}

  register(reqBody) {
    this.registerService.register(reqBody).subscribe(
      (res) => {
        localStorage.setItem('token', res['token']);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.toastr.error(error.error.message);
        if (error.error.message === 'This email is Already exist') {
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
