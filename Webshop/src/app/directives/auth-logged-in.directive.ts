import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountAuthService } from '../services/account-auth.service';

@Directive({
  selector: '[isLoggedIn]',
  standalone: true
})
export class AuthLoggedInDirective {
  private hasView = false;
  private condition: boolean | undefined;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AccountAuthService
  ) { 
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (this.condition !== undefined) {
        this.updateView(isLoggedIn === this.condition);
      }
    });
  }

  @Input() set isLoggedIn(condition: boolean) {
    this.condition = condition;
    this.updateView(this.authService.isLoggedIn() === condition);
  }

  private updateView(isMatch: boolean) {
    if (isMatch && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!isMatch && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

}
