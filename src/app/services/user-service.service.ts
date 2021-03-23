import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { User } from '../models/user.interface';
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

  findOne(id: number): Observable<User> {
    return this.http.get(this.USERS_URL + '/' + id);
  }

  findAll(page: number, size: number): Observable<UserData> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));

    return this.http.get(this.USERS_URL, {params}).pipe(
      map((userData: UserData) => userData),
      catchError(err => throwError(err))
    );
  }

  updateOne(user): Observable<User> {
    return this.http.put(this.USERS_URL + '/' + user.id, user);
  }

  paginateByName(page: number, size: number, username: string): Observable<UserData> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('username', username);

    return this.http.get(this.USERS_URL, {params}).pipe(
      map((userData: UserData) => userData),
      catchError(err => throwError(err))
    );
  }

  uploadProfileImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>(this.USERS_URL + '/upload', formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

}
