import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { SearchResult } from 'src/app/core/models/search-result.model';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { UserInfoDto } from 'src/app/core/dtos/user-info.dto';
import { UsersService } from 'src/app/core/services/users/users.service';
import { SearchResultDto } from 'src/app/core/dtos/search-result.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly path = '/search/users';
  private readonly baseUrl = environment.baseUrl;


  constructor(private http: HttpClient, private usersService: UsersService) { }

  getAll(username: string, pageSize?: number, pageIndex?: number): Observable<SearchResult> {
    return this.getSearchResults(username, pageSize, pageIndex).pipe(
      mergeMap((result) =>
        from(result.items).pipe(
          mergeMap((user: UserInfoDto) =>
            this.usersService.getByUsername(user.login),
          ),
          toArray(),
          map((users) => ({ users, totalCount: result.total_count })),
        ),
      ),
    );
  }

  private getSearchResults(
    username: string,
    pageSize = 5,
    pageIndex = 0,
  ): Observable<SearchResultDto> {
    const params = new HttpParams({
      fromObject: { q: username, per_page: pageSize.toString(), page: pageIndex.toString() },
    });
    return this.http.get<SearchResultDto>(`${this.baseUrl}${this.path}`, {
      params,
    });
  }
}
