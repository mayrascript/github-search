import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { from, Observable } from 'rxjs';
import { SearchResultDto } from 'src/app/core/dtos/search-result.dto';
import { map, mergeMap, tap, toArray } from 'rxjs/operators';
import { UserInfoDto } from 'src/app/core/dtos/user-info.dto';
import { SearchResult } from 'src/app/core/models/search-result.model';
import { UserDetailDto } from 'src/app/core/dtos/user-detail.dto';
import { User } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly path = '/users';
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getByUsername(username: string): Observable<User> {
    return this.http.get<UserDetailDto>(`${this.baseUrl}${this.path}/${username}`)
      .pipe(map((userDetail) => this.mapUser(userDetail)));
  }

  private mapUser = (userDetail: UserDetailDto): User =>
    ({
      followers: userDetail.followers,
      avatarUrl: userDetail.avatar_url,
      bio: userDetail.bio,
      url: userDetail.html_url,
      email: userDetail.email,
    } as User);
}
