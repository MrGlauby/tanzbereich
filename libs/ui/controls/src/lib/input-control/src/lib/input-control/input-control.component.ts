import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'tz-input-control',
  imports: [CommonModule],
  templateUrl: './input-control.component.html',
  styleUrl: './input-control.component.css',
})
export class InputControlComponent implements ControlValueAccessor, Validator {
  @Input() label = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() placeholder = '';

  value: string = '';
  touched = false;
  disabled = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }


// @HostBinding('class.invalid') get isInvalid() {
//   return this.control?.invalid && (this.control?.touched || this.control?.dirty);
// }

// @HostBinding('class.focused') isFocused = false;

// @HostBinding('class.disabled') get isDisabled() {
//   return this.disabled;
// }


}
