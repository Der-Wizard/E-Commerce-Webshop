import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export abstract class AccountAuthService {
    abstract isLoggedIn$: BehaviorSubject<boolean>;
    abstract login(credentials: { email: string, password: string} ): void;
    abstract logout(): void;
    abstract register(credentials: {
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
      }): void;
    abstract isLoggedIn(): boolean;
}