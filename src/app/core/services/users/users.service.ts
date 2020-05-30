import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { from, Observable } from 'rxjs';
import { SearchResultDto } from 'src/app/core/dtos/search-result.dto';
import { map, mergeMap, tap, toArray } from 'rxjs/operators';
import { UserInfoDto } from 'src/app/core/dtos/user-info.dto';
import { SearchResult } from 'src/app/core/models/search-result.model';
import { UserDetailDto } from 'src/app/core/dtos/user-detail.dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly searchPath = '/search/users'; // TODO: move logic
  private readonly path = '/users';
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAll(username: string): Observable<SearchResult> {
    return this.getSearchResults(username).pipe(
      mergeMap((result) =>
        from(result.items).pipe(
          mergeMap((user: UserInfoDto) =>
            this.getUserInfo(user.login).pipe(map((userDetail) => ({ ...user, ...userDetail }))),
          ),
          toArray(),
          map((users) => ({ users, totalCount: result.total_count })),
        ),
      ),
      tap(console.log),
    );
  }

  private getSearchResults(username: string): Observable<SearchResultDto> {
    const params = new HttpParams({ fromObject: { q: username } });
    return this.http.get<SearchResultDto>(`${this.baseUrl}${this.searchPath}`, { params });
  }

  private getUserInfo(username: string): Observable<UserDetailDto> {
    return this.http.get<UserDetailDto>(`${this.baseUrl}${this.path}/${username}`);
  }
}
