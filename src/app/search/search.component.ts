import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.service';
import { Observable } from 'rxjs';
import { SearchResultDto } from 'src/app/core/dtos/search-result.dto';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchResults$: Observable<SearchResultDto>;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  onValueSubmitted(username: string) {
    this.searchUser(username);
  }

  private searchUser(username: string) {
    this.usersService.getAll(username).subscribe();
    // this.searchResults$ = this.usersService.getAll(username);
  }
}
