import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelSyncDirective } from '../../../../directives/input/label-sync.directive';

@Component({
  selector: 'input-select',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    LabelSyncDirective,
    ReactiveFormsModule
  ],
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss'
})
export class InputSelectComponent {
  @Input('input_id') input_id!: string;
  @Input('label_text') label_text!: string;
  @Input('is_important') is_important!: any;
  @Input('formGroup') formGroup!: FormGroup;
}
