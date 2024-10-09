import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../../services/product/abstract-product-service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule, FormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent{
  searchTerm!: string;
  constructor(private router: Router, public productService: ProductService) { 
    this.searchTerm = this.productService.getSearchTerm();
  }

  onSearch() {
    this.productService.setSearchTerm(this.searchTerm);
    if (this.router.url !== '/products')
      this.router.navigate(['/products']);
  }
}
