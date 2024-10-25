import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CustomAlertService } from '../messages/custom-alert.service';
import { AccountAuthService } from './account-auth-service';

@Injectable()
export class ApiAccountAuthService extends AccountAuthService {
  override  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  override isLoggedIn(): boolean {
    return this.isLoggedIn$.value;
  }

  constructor(private http: HttpClient, private router: Router, private alertService: CustomAlertService) {
    super();
    this.checkLoginCookie();
  }

  private checkLoginCookie() {
    this.http.post(`${environment.apiUrl}/check_session.php`, {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe({
      next: (response: any) => {
        console.log(response)
        if (response.loggedIn) {
          this.isLoggedIn$.next(true);
          this.router.navigate(['/account']);
        }
        else {
          this.isLoggedIn$.next(false);
        }
      },
      error: (err) => {
      }
    })
  }

  override  login(credentials: { email: string; password: string; }): void {
    this.http.post(`${environment.apiUrl}/login.php`, credentials, {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe({
      next: (response: any) => {
        this.isLoggedIn$.next(true);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.alertService.createErrorMessage('Either the password or email address is wrong!');
        }
      }
    })
  }
  override logout(): void {
    this.http.post(`${environment.apiUrl}/logout.php`, {
      withCredentials: true
    }).subscribe(() => {
      this.isLoggedIn$.next(false);
      this.router.navigate(['/login']);
    })
  }
  override register(credentials: {
    forname: string,
    surname: string,
    email: string,
    password: string,
    country: string,
    company: string | null,
    address: string,
    address_additional: string,
    city: string,
    phone: string
  }): void {
    this.http.post(`${environment.apiUrl}/register.php`, credentials, {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe({
      next: (response: any) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {

      }
    })
  }
}
