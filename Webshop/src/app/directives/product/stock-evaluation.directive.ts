import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[stockEvaluation]',
  standalone: true
})
export class StockEvaluationDirective implements OnInit {
  @Input() stockEvaluation!: number;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    if (this.stockEvaluation == 0) {
      this.el.nativeElement.style.color = 'grey';
      this.el.nativeElement.innerHTML = 'Out of Stock';
    } else if (this.stockEvaluation >= 1 && this.stockEvaluation < 30) {
      this.el.nativeElement.style.color = 'red';
      this.el.nativeElement.innerHTML = 'Runs out soon: ' + this.stockEvaluation;
    } else if (this.stockEvaluation >= 30 && this.stockEvaluation < 50) {
      this.el.nativeElement.style.color = 'orange';
      this.el.nativeElement.innerHTML = 'Low stock: ' + this.stockEvaluation;
    } else {
      this.el.nativeElement.style.color = 'green';
      this.el.nativeElement.innerHTML = 'Stock: ' + this.stockEvaluation;
    }
  }
}
