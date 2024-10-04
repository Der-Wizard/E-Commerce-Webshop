import { Component, Input } from '@angular/core';
import { LabelSyncDirective } from '../../../../directives/input/label-sync.directive';
import { NgIf } from '@angular/common';

@Component({
  selector: 'input-base',
  standalone: true,
  imports: [
    LabelSyncDirective,
    NgIf
  ],
  templateUrl: './input-base.component.html',
  styleUrl: './input-base.component.scss'
})
export class InputBaseComponent{
  @Input('id') id!: string;
  @Input('type') type!: string;
  @Input('label_text') label_text!: string;
  @Input('is_important') is_important!: any;
  
}
