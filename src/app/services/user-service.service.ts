import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from './authentication.service';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

export interface UserData {
  items: User[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPages: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // the start of the URL string is in proxy.conf.json
  USERS_URL = '/api/users';

  constructor(
    private http: HttpClient
  ) { }

  findAll(page: number, size: number): Observable<UserData> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));

    return this.http.get(this.USERS_URL, {params}).pipe(
      map((userData: UserData) => userData),
      catchError(err => throwError(err))
    );
  }

}
