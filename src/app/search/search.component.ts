import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  onValueSubmitted(username: string) {
    this.searchUser(username);
  }

  private searchUser(username: string) {
    this.usersService.getAll(username)
    .subscribe(res => console.log(res));
  }

}
