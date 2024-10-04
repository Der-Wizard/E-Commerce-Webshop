import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LabelSyncDirective } from '../../../../directives/input/label-sync.directive';

@Component({
  selector: 'input-select',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    FormsModule,
    LabelSyncDirective
  ],
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss'
})
export class InputSelectComponent {
  @Input('id') id!: string;
  @Input('label_text') label_text!: string;
  @Input('is_important') is_important!: any;

  selectedCountry: string | null = null; 

  isInvalid(): boolean {
    return this.selectedCountry === null || this.selectedCountry === '';
  }
}
