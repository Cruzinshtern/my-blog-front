import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

export interface LoginForm {
  email: string;
  password: string;
}

export interface User {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  role?: string;
  profileImage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // the start of the URL string is in proxy.conf.json
  REGISTER_URL = '/api/users';
  LOGIN_URL = this.REGISTER_URL + '/login';

  constructor(
    private http: HttpClient
  ) { }

  login(loginForm: LoginForm) {
    return this.http.post<any>(this.LOGIN_URL, {email: loginForm.email, password: loginForm.password}).pipe(
      map((token) => {
        localStorage.setItem('blog-token', token.access_token);
        return token;
      })
    );
  }

  register(user) {
    return this.http.post<any>(this.REGISTER_URL, user).pipe(
      map(registeredUser => registeredUser)
    );
  }


}
