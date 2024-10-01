import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[categorySelected]',
  standalone: true
})
export class HighlightSelectedDirective{
  @Input() category!: string;

  @HostListener('click') onClick() {
    
  }
}
