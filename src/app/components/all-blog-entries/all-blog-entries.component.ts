import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {BlogEntriesPageable} from '../../models/blog-entry.interface';
import {BlogService} from '../../services/blog.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-all-blog-entries',
  templateUrl: './all-blog-entries.component.html',
  styleUrls: ['./all-blog-entries.component.scss']
})
export class AllBlogEntriesComponent {

  @Input()
  blogEntries: BlogEntriesPageable;

  @Output()
  paginate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  pageEvent: PageEvent;

  constructor(
  ) { }

  onPaginateChange(event: PageEvent) {
    event.pageIndex = event.pageIndex + 1;
    this.paginate.emit(event);
  }
}
