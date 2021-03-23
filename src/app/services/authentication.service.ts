import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

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

export const JWT_TOKEN_KEY = 'blog-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // the start of the URL string is in proxy.conf.json
  REGISTER_URL = '/api/users';
  LOGIN_URL = this.REGISTER_URL + '/login';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  login(loginForm: LoginForm) {
    return this.http.post<any>(this.LOGIN_URL, {email: loginForm.email, password: loginForm.password}).pipe(
      map((token) => {
        localStorage.setItem(JWT_TOKEN_KEY, token.access_token);
        return token;
      })
    );
  }

  register(user) {
    return this.http.post<any>(this.REGISTER_URL, user).pipe(
      map(registeredUser => registeredUser)
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    return this.jwtHelper.isTokenExpired(token);
  }

}
