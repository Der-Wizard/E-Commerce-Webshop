import { Component, Input } from '@angular/core';
import { InputBaseComponent } from '../base/input-base.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'input-text-area',
  standalone: true,
  imports: [
    InputBaseComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './input-text-area.component.html',
  styleUrl: './input-text-area.component.scss'
})
export class InputTextAreaComponent  {
  @Input('input_id') input_id!: string;
  @Input('label_text') label_text!: string;
  @Input('is_important') is_important!: any;
  @Input('formGroup') formGroup!: FormGroup;
  @Input('is_optional') is_optional!: any;
}
