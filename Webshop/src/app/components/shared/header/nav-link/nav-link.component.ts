import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-link',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './nav-link.component.html',
  styleUrl: './nav-link.component.scss'
})
export class NavLinkComponent {
  @Input() link!: string;
  @Input() icon_class!: string;
  @Input() content!: string;
}
