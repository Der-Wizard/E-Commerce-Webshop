import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-alert',
  standalone: true,
  imports: [],
  templateUrl: './custom-alert.component.html',
  styleUrl: './custom-alert.component.scss'
})
export class CustomAlertComponent {
  @Input() message: string = '';

  close() { }
}
