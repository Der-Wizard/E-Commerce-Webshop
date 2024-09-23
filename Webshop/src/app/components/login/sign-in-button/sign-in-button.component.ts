import { Component, EventEmitter, Output, output } from '@angular/core';

@Component({
  selector: 'app-sign-in-button',
  standalone: true,
  imports: [],
  templateUrl: './sign-in-button.component.html',
  styleUrl: './sign-in-button.component.scss'
})
export class SignInButtonComponent {
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    this.buttonClick.emit();
  }
}
