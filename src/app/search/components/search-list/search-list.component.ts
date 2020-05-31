import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})
export class SearchListComponent implements OnInit {
  @Input() source: { totalCount: number; users: User[] } = { totalCount: 0, users: [] };
  @Input() pagigationSetup: { pageSize: number; pageIndex: number } = { pageSize: 5, pageIndex: 0 };

  @Output() pageChanged = new EventEmitter<PageEvent>();

  displayedColumns: string[] = ['picture', 'username', 'bio', 'followers', 'actions'];

  constructor() {}

  ngOnInit(): void {}

  onPaginatorChange(pageEvent: PageEvent) {
    this.pageChanged.emit(pageEvent);
  }
}
