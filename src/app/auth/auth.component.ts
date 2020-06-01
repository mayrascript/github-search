import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, iif, of } from 'rxjs';

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
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((params: any) =>
          iif(
            () => params && params.code,
            this.authService.requestAccessToken(params.code),
            of(EMPTY),
          ),
        ),
      )
      .subscribe((res) => {
        this.snackBar.open('Welcome!', '', {
          duration: 300,
        });
        this.router.navigate(['/search']);
      });
  }
}
