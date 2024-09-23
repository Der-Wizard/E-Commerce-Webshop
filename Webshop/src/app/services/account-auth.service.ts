import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountAuthService {
  private router = inject(Router);
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  register(user: any): Observable<any> {
    this.loggedIn.next(true);
    return of({ success: true, message: 'Mock' });
  }

  login(user: any): Observable<any> {
    this.loggedIn.next(true);
    return of({ success: true, message: 'Mock' });
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['login']);
  }
}
