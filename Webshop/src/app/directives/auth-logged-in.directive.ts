import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { map, take } from 'rxjs';
import { AccountAuthService } from '../services/auth/account-auth-service';

@Directive({
  selector: '[isLoggedIn]',
  standalone: true
})
export class AuthLoggedInDirective {
  private condition: boolean | undefined;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AccountAuthService
  ) {
    this.authService.isLoggedIn$.pipe(take(1)).subscribe((isLoggedIn) => {
      this.updateView(isLoggedIn);
    });
  }

  @Input() set isLoggedIn(condition: boolean) {
    this.condition = condition;
    this.authService.isLoggedIn$.pipe(take(1)).subscribe((isLoggedIn) => {
      this.updateView(isLoggedIn);
    });
  }

  private updateView(isAuthenticated?: boolean) {
    if (isAuthenticated === undefined) return;

    if (this.condition && isAuthenticated) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (!this.condition && !isAuthenticated) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
