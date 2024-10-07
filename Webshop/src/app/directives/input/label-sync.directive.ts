import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[labelSync]',
  standalone: true
})
export class LabelSyncDirective implements OnInit{

  @Input('labelSync') labelElement: HTMLLabelElement | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    setTimeout(() => {
      const inputValue = this.el.nativeElement.value;
      this.updateLabel(inputValue);
    }, 0);
  }

  @HostListener('input') onInputChange() {
    const inputValue = this.el.nativeElement.value;
    this.updateLabel(inputValue);
  }

  private updateLabel(inputValue: string){
    if(!this.labelElement)
      return;

    if(inputValue){
      this.renderer.addClass(this.labelElement,'filled');
    } else {
      this.renderer.removeClass(this.labelElement,'filled');
    }
  }

}
