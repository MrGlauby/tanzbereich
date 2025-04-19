import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tz-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() isPrimary: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() label: string = '';

  @HostBinding('class.primary') get primary() {
    return this.isPrimary;
  }

  @HostBinding('class.disabled') get disabled() {
    return this.isDisabled;
  }
}
