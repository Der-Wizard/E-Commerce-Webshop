import { Component, Input } from '@angular/core';
import { InputBaseComponent } from '../base/input-base.component';
import { LabelSyncDirective } from '../../../../directives/input/label-sync.directive';
import { NgIf } from '@angular/common';

@Component({
  selector: 'input-radio',
  standalone: true,
  imports: [
    InputBaseComponent,
    LabelSyncDirective,
    NgIf
  ],
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.scss'
})
export class InputRadioComponent {
  @Input('id') id!: string;
  @Input('label_text') label_text!: string;
  @Input('is_important') is_important!: any;
}
