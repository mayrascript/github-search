import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.service';
import { SearchResult } from 'src/app/core/models/search-result.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchResults$: Observable<SearchResult>;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  onValueSubmitted(username: string) {
    this.searchUser(username);
  }

  private searchUser(username: string) {
    this.searchResults$ = this.usersService.getAll(username);
  }

}
