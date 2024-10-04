import { Component, Input } from '@angular/core';
import { InputBaseComponent } from '../base/input-base.component';
import { LabelSyncDirective } from '../../../../directives/input/label-sync.directive';
import { NgIf } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'input-radio',
  standalone: true,
  imports: [
    InputBaseComponent,
    LabelSyncDirective,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.scss'
})
export class InputRadioComponent {
  @Input('input_id') input_id!: string;
  @Input('label_text') label_text!: string;
  @Input('is_important') is_important!: any;
  @Input('is_optional') is_optional: any = false;
  @Input('formGroup') formGroup!: FormGroup;

  toggleRadio() {
    const currentValue = this.formGroup.get(this.input_id)?.value;
    this.formGroup.get(this.input_id)?.setValue(!currentValue);
  }
}
