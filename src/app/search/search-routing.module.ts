import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from 'src/app/search/search.component';
import { SearchListComponent } from 'src/app/search/components/search-list/search-list.component';


const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    children: [
      {
        path: '',
        component: SearchListComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
