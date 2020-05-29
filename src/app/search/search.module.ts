import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchComponent } from 'src/app/search/search.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { SearchDetailComponent } from './components/search-detail/search-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SearchFormComponent, SearchComponent, SearchListComponent, SearchDetailComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
  ]
})
export class SearchModule { }
