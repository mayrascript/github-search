import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
