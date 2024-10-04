import { Component, Input } from '@angular/core';
import { LabelSyncDirective } from '../../../../directives/input/label-sync.directive';
import { NgIf } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'input-base',
  standalone: true,
  imports: [
    LabelSyncDirective,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './input-base.component.html',
  styleUrl: './input-base.component.scss'
})
export class InputBaseComponent{
  @Input('input_id') input_id!: string;
  @Input('type') type!: string;
  @Input('label_text') label_text!: string;
  @Input('is_important') is_important!: any;
  @Input('formGroup') formGroup!: FormGroup;
}
