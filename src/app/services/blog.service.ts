import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BlogEntriesPageable, BlogEntry} from '../models/blog-entry.interface';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  BLOG_ENTRIES_URL = '/api/blog-entries';

  constructor(
    private http: HttpClient
  ) { }

  findOne(id: number): Observable<BlogEntry> {
    return this.http.get<BlogEntry>(this.BLOG_ENTRIES_URL + `/${id}`);
  }

  indexByUser(userId: number, page: number, limit: number): Observable<BlogEntriesPageable> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<BlogEntriesPageable>(this.BLOG_ENTRIES_URL + `/user/${userId}`, {params});
  }

  indexAll(page: number, limit: number): Observable<BlogEntriesPageable> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<BlogEntriesPageable>(this.BLOG_ENTRIES_URL, {params}).pipe(
      tap(a => console.log(a))
    )
  }

  post(blogEntry: BlogEntry): Observable<BlogEntry> {
    return this.http.post(this.BLOG_ENTRIES_URL, blogEntry);
  }

  uploadHeaderImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>(this.BLOG_ENTRIES_URL + '/image/upload', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
