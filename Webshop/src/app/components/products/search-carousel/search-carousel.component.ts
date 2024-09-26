import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-carousel',
  standalone: true,
  imports: [NgIf],
  templateUrl: './search-carousel.component.html',
  styleUrls: ['./search-carousel.component.scss'],
})
export class SearchCarouselComponent {
  @Input() current_page_index: number = 1;
  @Input() maximum_page_index: number = 1;

  @Output() pageChanged = new EventEmitter<number>();

  decrease_page_index() {
    if (this.current_page_index <= 1) {
      return;
    }
    this.current_page_index--;
    this.pageChanged.emit(this.current_page_index);
  }

  increase_page_index() {
    if (this.current_page_index >= this.maximum_page_index) {
      return;
    }
    this.current_page_index++;
    this.pageChanged.emit(this.current_page_index);
  }

  skipToSearch(page: number) {
    if (page < 1 || page > this.maximum_page_index) {
      return;
    }
    this.current_page_index = page;
    this.pageChanged.emit(this.current_page_index);
  }
}
