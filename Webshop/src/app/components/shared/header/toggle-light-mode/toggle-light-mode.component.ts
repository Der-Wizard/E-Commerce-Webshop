import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-toggle-light-mode',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './toggle-light-mode.component.html',
  styleUrl: './toggle-light-mode.component.scss'
})
export class ToggleLightModeComponent {
  isLightMode = true;

  constructor() {
    this.isLightMode = localStorage.getItem('light-mode') === 'true';
    document.body.classList.toggle('dark-mode', !this.isLightMode);
    document.body.classList.toggle('light-mode', this.isLightMode);
  }

  toggleLightMode() {
    localStorage.setItem('light-mode', (!this.isLightMode).toString());
    this.isLightMode = !this.isLightMode;
    document.body.classList.toggle('dark-mode', !this.isLightMode);
    document.body.classList.toggle('light-mode', this.isLightMode);
  }
}
