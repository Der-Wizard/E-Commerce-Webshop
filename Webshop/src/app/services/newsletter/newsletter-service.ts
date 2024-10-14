import { Observable } from "rxjs";

export abstract class NewsletterService {
    abstract subscribeEmail(email: string): Observable<any>;
    abstract unsubscribeEmail(email: string): Observable<any>;
}