import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  baseUrl: string;
  registerForm = {
    UserName: {
      withLabel: false,
      label: 'User Name',
      value: '',
      col: 'col-12 py-2',
      type: 'text',
      rules: {
        required: true,
      },
    },
    Email: {
      withLabel: false,
      label: 'Email',
      value: '',
      col: 'col-12 py-2',
      type: 'text',
      rules: { required: true, email: true },
    },
    PhoneNumber: {
      withLabel: false,
      label: 'Phone Number',
      value: '',
      col: 'col-12 py-2',
      type: 'number',
      rules: {
        required: true,
        phoneNumber: true,
      },
    },
    Password: {
      withLabel: false,
      label: 'Password',
      value: '',
      col: 'col-12 py-2',
      type: 'password',
      rules: {
        required: true,
        password:true
      },
    },
  };

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router : Router,
    private httpClient: HttpClient
  ) {
    this.baseUrl = environment.baseUrl;
  }


  
  register(reqBody){
    const url = this.baseUrl + 'Account/Register';
    return this.httpClient.post(url, reqBody);
  }
}
