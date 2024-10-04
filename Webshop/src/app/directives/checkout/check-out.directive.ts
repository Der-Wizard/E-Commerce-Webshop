import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Directive({
  selector: '[isCheckOut]',
  standalone: true
})
export class CheckOutDirective implements OnInit {
  private hasView = false;
  private condition: boolean | undefined;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private router: Router
  ) {} 

  ngOnInit() {
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe((event: NavigationEnd) => {
      if(this.condition !== undefined){
        this.updateView(false);
        this.updateView(event.url.includes('/checkout') === this.condition);
      } 
    });
  }

  @Input() set isCheckOut(condition: boolean) {
    this.condition = condition;
    this.updateView(this.router.url.includes('/checkout') === condition);
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
