import { Component, Input, OnInit } from '@angular/core';
import { UserInfoDto } from 'src/app/core/dtos/user-info.dto';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})
export class SearchListComponent implements OnInit {
  @Input() dataSource: UserInfoDto[] = [];
  displayedColumns: string[] = ['picture', 'username'];

  //displayedColumns: string[] = ['picture', 'description', 'stars', 'followers'];

  constructor() {}

  ngOnInit(): void {}
}
