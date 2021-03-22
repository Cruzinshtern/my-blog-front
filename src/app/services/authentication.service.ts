import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // the start of the URL string is in proxy.conf.json
  BASIC_AUTH_URL = '/api/users/login';

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    return this.http.post<any>(this.BASIC_AUTH_URL, {email, password}).pipe(
      map((token) => {
        localStorage.setItem('blog-token', token.access_token);
        return token;
      })
    )
  }


}
