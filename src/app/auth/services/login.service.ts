import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl: string;
  loginForm = {
    Email: {
      label: 'Email',
      value: '',
      col: 'col-12 py-2',
      type: 'text',
      rules: {
        required: true,
      },
    },
    Password: {
      label: 'Password',
      value: '',
      col: 'col-12 py-2',
      type: 'password',
      rules: {
        required: true,
      },
    },
  };
  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl = environment.baseUrl;
  }

  login(reqBody) {
    const url = this.baseUrl + 'Account/Login';
    return this.httpClient.post(url, reqBody);
  }
}
