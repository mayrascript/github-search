import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { SearchResult } from 'src/app/core/models/search-result.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly path = '/search/users';
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll(username: string): Observable<SearchResult> {
    const params = new HttpParams({fromObject: {q: username }});

    return this.http.get<SearchResult>(`${this.baseUrl}${this.path}`, {params});
  }
}
