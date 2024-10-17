import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputBaseComponent } from '../base/input-base.component';

@Component({
  selector: 'input-password',
  standalone: true,
  imports: [
    InputBaseComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.scss'
})
export class InputPasswordComponent {

  @Input('input_id') input_id!: string;
  @Input('label_text') label_text: string = 'Email';
  @Input('is_important') is_important!: any;
  @Input('formGroup') formGroup!: FormGroup;
}
