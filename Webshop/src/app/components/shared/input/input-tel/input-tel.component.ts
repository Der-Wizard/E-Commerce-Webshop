import { Component, Input } from '@angular/core';
import { InputBaseComponent } from '../base/input-base.component';

@Component({
  selector: 'input-tel',
  standalone: true,
  imports: [
    InputBaseComponent
  ],
  templateUrl: './input-tel.component.html',
  styleUrl: './input-tel.component.scss'
})
export class InputTelComponent {
  @Input('id') id!: string;
  @Input('label_text') label_text!: string;
  @Input('is_important') is_important!: any;
}
