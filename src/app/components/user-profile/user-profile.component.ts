import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { User } from '../../models/user.interface';
import {ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user-service.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {BlogEntriesPageable} from '../../models/blog-entry.interface';
import {BlogService} from '../../services/blog.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  private userId$: Observable<number> = this.activatedRoute.params.pipe(
    map((params: Params) => parseInt(params['id']))
  );

  user$: Observable<User> = this.userId$.pipe(
    switchMap((userId: number) => this.userService.findOne(userId))
  );

  blogEntries$: Observable<BlogEntriesPageable> = this.userId$.pipe(
    switchMap((userId: number) => this.blogService.indexByUser(userId, 1, 10))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private blogService: BlogService
  ) { }

  onPaginateChange(event: PageEvent) {
    return this.userId$.pipe(
      tap((userId: number) => this.blogEntries$ = this.blogService.indexByUser(userId, event.pageIndex, event.pageSize))
    );
  }
}
