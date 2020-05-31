import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        map((params) => {
          const code = params && params.code;
          if (code) {
            this.authService.code = params.code;
            // TODO: add notification alert
          }
          return code;
        }),
        switchMap((code) => code && this.authService.requestAccessToken()),
      )
      .subscribe((res) => this.router.navigate(['/search']));
  }
}
