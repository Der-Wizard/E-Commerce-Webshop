import { Injectable } from '@angular/core';
import { NewsletterService } from './newsletter-service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiNewsletterService extends NewsletterService {
  constructor(private http: HttpClient) {
    super();
  }

  override subscribeEmail(email: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('email', email);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<string>(environment.apiUrl + '/newsletter_subscribe.php', body.toString(), { headers });
  }

  override unsubscribeEmail(email: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('email', email);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<string>(environment.apiUrl + '/newsletter_unsubscribe.php', body.toString(), { headers });
  }
}
