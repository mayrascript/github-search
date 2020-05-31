import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { from, Observable } from 'rxjs';
import { SearchResultDto } from 'src/app/core/dtos/search-result.dto';
import { map, mergeMap, tap, toArray } from 'rxjs/operators';
import { UserInfoDto } from 'src/app/core/dtos/user-info.dto';
import { SearchResult } from 'src/app/core/models/search-result.model';
import { UserDetailDto } from 'src/app/core/dtos/user-detail.dto';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly searchPath = '/search/users'; // TODO: move logic
  private readonly path = '/users';
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAll(username: string, pageSize?: number, pageIndex?: number): Observable<SearchResult> {
    return this.getSearchResults(username, pageSize, pageIndex).pipe(
      mergeMap((result) =>
        from(result.items).pipe(
          mergeMap((user: UserInfoDto) =>
            this.getUserInfo(user.login).pipe(map((userDetail) => this.mapUser(userDetail))),
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
    return this.http.get<SearchResultDto>(`${this.baseUrl}${this.searchPath}`, {
      params,
    });
  }

  private getUserInfo(username: string): Observable<UserDetailDto> {
    return this.http.get<UserDetailDto>(`${this.baseUrl}${this.path}/${username}`);
  }

  private mapUser = (userDetail: UserDetailDto): User =>
    ({
      followers: userDetail.followers,
      avatarUrl: userDetail.avatar_url,
      bio: userDetail.bio,
      url: userDetail.bio,
      email: userDetail.email,
    } as User);
}
