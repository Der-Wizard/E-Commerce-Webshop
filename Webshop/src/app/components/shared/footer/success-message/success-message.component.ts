import { Component, Input } from '@angular/core';

@Component({
  selector: 'footer-success-message',
  standalone: true,
  imports: [],
  templateUrl: './success-message.component.html',
  styleUrl: './success-message.component.scss'
})
export class SuccessMessageComponent {
  @Input() successMessage!: string;
}
