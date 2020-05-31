import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from 'src/app/core/models/search-result.model';
import { PageEvent } from '@angular/material/paginator';
import { finalize } from 'rxjs/operators';
import { SearchService } from 'src/app/core/services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchResults$: Observable<SearchResult>;
  paginationSetup: { pageSize: number; pageIndex: number };
  private username;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  onValueSubmitted(username: string) {
    this.username = username;
    this.searchUser(username);
  }

  onPageChanged(ev: PageEvent) {
    this.searchUser(this.username, ev.pageSize, ev.pageIndex);
  }

  private searchUser(username: string, pageSize?: number, pageIndex?: number) {
    this.searchResults$ = this.searchService.getAll(username, pageSize, pageIndex).pipe(
      finalize(() => {
        this.paginationSetup = { pageSize, pageIndex };
      }),
    );
  }
}
