import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AccountAuthService } from './account-auth-service';

@Injectable({
  providedIn:'root'
})
export class DummyAccountAuthService extends AccountAuthService {
  override isLoggedIn$ = new BehaviorSubject<boolean>(false);

  private mockUser = { email: 'abc@web.de', password: '123' };

  constructor(private router: Router) {
    super();
    var token = this.getToken();

    if (token === null)
      return;

    if (!this.mock_is_token_identical(token))
      return;

    this.isLoggedIn$.next(true);
  }

  override isLoggedIn(): boolean {
    return this.isLoggedIn$.value;
  }

  register(user: any): Observable<any> {
    this.isLoggedIn$.next(true);
    return of({ success: true, message: 'Mock' });
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    console.log(credentials);
    if (this.mockUser.email != credentials.email || this.mockUser.password != credentials.password)
      return of({ success: false, message: 'mock denied' });

    const token = this.mock_get_server_token();
    localStorage.setItem('authToken', token);
    this.isLoggedIn$.next(true);
    return of({ success: true, message: 'Mock' });
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isLoggedIn$.next(false);
    this.router.navigate(['login']);
  }


  mock_get_server_token(): string {
    return 'mock-auth-token';
  }

  mock_is_token_identical(token: string): boolean {
    return token === 'mock-auth-token';
  }
}
