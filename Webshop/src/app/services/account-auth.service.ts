import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountAuthService{
  private router = inject(Router);
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  private mockUser = { email: 'abc@web.de', password: '123' };

  constructor() {
    var token = this.getToken();

    if (token === null)
      return;

    if (!this.mock_is_token_identical(token))
      return;

    this.loggedIn.next(true);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  register(user: any): Observable<any> {
    this.loggedIn.next(true);
    return of({ success: true, message: 'Mock' });
  }

  login(email: string, password: string): Observable<any> {
    if (this.mockUser.email != email || this.mockUser.password != password)
      return of({ success: false, message: 'mock denied' });

    const token = this.mock_get_server_token();
    localStorage.setItem('authToken', token);
    this.loggedIn.next(true);
    return of({ success: true, message: 'Mock' });
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.loggedIn.next(false);
    this.router.navigate(['login']);
  }


  mock_get_server_token(): string{
    return 'mock-auth-token';
  }

  mock_is_token_identical(token:string): boolean{
    return token === 'mock-auth-token';
  }
}
