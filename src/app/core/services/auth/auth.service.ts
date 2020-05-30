import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly path = environment.githubAuthUrl;
  private readonly clientId = environment.clientId;
  private readonly redirectUrl = environment.callbackUrl;
  // tslint:disable-next-line:variable-name
  private _code: string;

  constructor(private http: HttpClient) {}

  requestGithubLogin() {
    const params = new HttpParams({
      fromObject: { client_id: this.clientId, redirect_uri: this.redirectUrl },
    });
    return this.http.get(`${this.path}`, { params });
  }

  getGithubAuthUrl() {
    return `${this.path}?client_id=${this.clientId}&redirect_uri=${this.redirectUrl}`;
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    console.log(value);
    this._code = value;
  }
}
