import { Component, Input, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/core/models/user-info.model';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
  @Input() dataSource: UserInfo[] = [];
  displayedColumns: string[] = ['picture', 'username'];

  // displayedColumns: string[] = ['picture', 'description', 'stars', 'followers'];

  constructor() { }

  ngOnInit(): void {
  }

}
