import { Component, Input } from '@angular/core';
import { InputBaseComponent } from '../base/input-base.component';

@Component({
  selector: 'input-text',
  standalone: true,
  imports: [
    InputBaseComponent,
  ],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent {
  @Input('id') id!: string;
  @Input('label_text') label_text!: string;
  @Input('is_important') is_important!: any;
}
