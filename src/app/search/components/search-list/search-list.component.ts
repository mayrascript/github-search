import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})
export class SearchListComponent implements OnInit {
  @Input() dataSource: User[] = [];
  displayedColumns: string[] = ['picture', 'username', 'bio', 'followers'];

  constructor() {}

  ngOnInit(): void {}
}
