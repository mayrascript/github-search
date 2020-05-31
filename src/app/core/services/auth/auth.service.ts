import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { AccessTokenDto } from 'src/app/core/dtos/access-token.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly path = environment.githubAuthUrl;
  private readonly authEndpoint = 'authorize';
  private readonly accessToken = 'access_token';
  private readonly clientId = environment.clientId;
  private readonly clientSecret = environment.clientSecret;
  private readonly redirectUrl = environment.callbackUrl;
  // tslint:disable-next-line:variable-name
  private _code: string;
  // tslint:disable-next-line:variable-name
  private _token: string;
  // tslint:disable-next-line:variable-name
  private _redirecUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    this.buildRedirectUrl();
  }

  requestAccessToken() {
    const params = new HttpParams({
      fromObject: {
        client_id: this.clientId,
        redirect_uri: this.redirectUrl,
        client_secret: this.clientSecret,
        code: this.code,
      },
    });
    const headers = new HttpHeaders({
      Accept: 'application/json',
    });

    return this.http
      .post<AccessTokenDto>(`${this.path}/${this.accessToken}`, null, { params, headers })
      .pipe(
        map((res) => {
          this.token = res.access_token;
          return res.access_token;
        }),
        catchError((err) => {
          console.log(err);
          return err;
        }),
      );
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get redirecUrl(): string {
    return this._redirecUrl;
  }

  private buildRedirectUrl() {
    const params = this.router
      .createUrlTree(['/'], {
        queryParams: { client_id: this.clientId, redirect_uri: this.redirectUrl },
      })
      .toString();

    this._redirecUrl = `${this.path}/${this.authEndpoint}${params}`;
  }
}
