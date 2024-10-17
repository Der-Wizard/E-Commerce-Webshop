import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentRef, ElementRef, Inject, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { CustomAlertComponent } from '../../components/shared/custom-alert/custom-alert.component';

@Injectable({
  providedIn:'root'
})
export class CustomAlertService {
  private containerRef: ViewContainerRef | null = null;
  constructor() {}

  setContainer(viewContainerRef: ViewContainerRef) {
    this.containerRef = viewContainerRef;
  }

  createSuccessMessage(message: string) {
    this.createAlertMessage(message, 0);
  }
  createWarningMessage(message: string) {
    this.createAlertMessage(message, 1);
  }
  createErrorMessage(message: string) {
    this.createAlertMessage(message, 2);
  }
  private createAlertMessage(message: string, errorCode: number) {
    if(!this.containerRef) {
      alert(message);
      return;
    }

    const componentRef: ComponentRef<CustomAlertComponent> = this.containerRef.createComponent(CustomAlertComponent);
    componentRef.instance.message = message;

    componentRef.instance.close = () => {
      componentRef.destroy();
    };

    setTimeout(() => {
      componentRef.destroy();
    }, 3000);
  }
}
