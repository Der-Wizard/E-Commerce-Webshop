import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  searchTerm: string = '';
  private router = inject(Router);
  onSearch() {
    this.router.navigate(['/products'], { queryParams: { search: this.searchTerm } });
  }
  clearSearch(){
    this.router.navigate(['/products']);
    this.searchTerm = '';
  }
}
