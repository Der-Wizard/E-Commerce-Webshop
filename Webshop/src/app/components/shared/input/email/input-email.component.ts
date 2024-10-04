import { Component, Input } from '@angular/core';
import { InputBaseComponent } from '../base/input-base.component';

@Component({
  selector: 'input-email',
  standalone: true,
  imports: [
    InputBaseComponent
  ],
  templateUrl: './input-email.component.html',
  styleUrl: './input-email.component.scss'
})
export class InputEmailComponent {
  @Input('id') id!: string;
  @Input('label_text') label_text: string = 'Email';
  @Input('is_important') is_important!: any;
}
