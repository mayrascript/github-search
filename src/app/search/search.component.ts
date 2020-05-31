import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.service';
import { Observable } from 'rxjs';
import { SearchResult } from 'src/app/core/models/search-result.model';
import { PageEvent } from '@angular/material/paginator';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchResults$: Observable<SearchResult>;
  paginationSetup: { pageSize: number; pageIndex: number };
  private username;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  onValueSubmitted(username: string) {
    this.username = username;
    this.searchUser(username);
  }

  onPageChanged(ev: PageEvent) {
    console.log(ev);
    this.searchUser(this.username, ev.pageSize, ev.pageIndex);
  }

  private searchUser(username: string, pageSize?: number, pageIndex?: number) {
    this.searchResults$ = this.usersService.getAll(username, pageSize, pageIndex).pipe(
      finalize(() => {
        this.paginationSetup = { pageSize, pageIndex };
        console.log(this.paginationSetup);
      }),
    );
  }
}
