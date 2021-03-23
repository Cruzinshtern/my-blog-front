import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BlogEntriesPageable} from '../models/blog-entry.interface';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  BLOG_ENTRIES_URL = '/api/blog-entries';

  constructor(
    private http: HttpClient
  ) { }

  indexAll(page: number, limit: number): Observable<BlogEntriesPageable> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<BlogEntriesPageable>(this.BLOG_ENTRIES_URL, {params}).pipe(
      tap(a => console.log(a))
    )
  }
}
