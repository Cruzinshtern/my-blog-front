import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {BlogEntriesPageable} from '../../models/blog-entry.interface';
import {BlogService} from '../../services/blog.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-all-blog-entries',
  templateUrl: './all-blog-entries.component.html',
  styleUrls: ['./all-blog-entries.component.scss']
})
export class AllBlogEntriesComponent implements OnInit {

  dataSource: Observable<BlogEntriesPageable> = this.blogService.indexAll(1, 1);
  pageEvent: PageEvent;

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let limit = event.pageSize;

    page = page + 1;

    this.dataSource = this.blogService.indexAll(page, limit);
  }
}
