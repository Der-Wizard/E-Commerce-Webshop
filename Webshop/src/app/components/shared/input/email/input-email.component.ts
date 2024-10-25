import { Component, Input } from '@angular/core';
import { InputBaseComponent } from '../base/input-base.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'input-email',
  standalone: true,
  imports: [
    InputBaseComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './input-email.component.html',
  styleUrl: './input-email.component.scss'
})
export class InputEmailComponent {
  @Input('input_id') input_id!: string;
  @Input('label_text') label_text: string = 'Email';
  @Input('is_important') is_important!: any;
  @Input('formGroup') formGroup!: FormGroup;
}
