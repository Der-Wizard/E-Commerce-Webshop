import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[stockEvaluation]',
  standalone: true
})
export class StockEvaluationDirective implements OnInit {
  @Input() stockEvaluation!: number; // Match the input with the selector

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    if (this.stockEvaluation == 0) {
      this.el.nativeElement.style.color = '#FF785A';
      this.el.nativeElement.innerHTML = 'Out of Stock';
    } else if (this.stockEvaluation >= 1 && this.stockEvaluation < 30) {
      this.el.nativeElement.style.color = '#FF785A';
      this.el.nativeElement.innerHTML = 'Low stock: ' + this.stockEvaluation;
    } else if (this.stockEvaluation >= 30 && this.stockEvaluation < 50) {
      this.el.nativeElement.style.color = '#FFAA5A';
      this.el.nativeElement.innerHTML = 'Low stock: ' + this.stockEvaluation;
    } else if (this.stockEvaluation >= 50 && this.stockEvaluation < 100) {
      this.el.nativeElement.style.color = '#FFD25A';
      this.el.nativeElement.innerHTML = 'Limited stock: ' + this.stockEvaluation;
    } else {
      this.el.nativeElement.style.color = '#FFF05A';
      this.el.nativeElement.innerHTML = 'Stock: ' + this.stockEvaluation;
    }
  }
}
