import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountAuthService {

  constructor() { }

  register(user: any): Observable<any> {
    return of({ success: true, message:'Mock'});
  }

  login(user: any): Observable<any> {
    return of({ success: true, message:'Mock'});
  }
}
