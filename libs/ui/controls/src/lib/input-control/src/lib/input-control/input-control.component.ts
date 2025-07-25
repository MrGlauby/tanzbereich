import { Component, inject, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'tz-input-control',
  imports: [CommonModule],
  templateUrl: './input-control.component.html',
  styleUrl: './input-control.component.css',
})
export class InputControlComponent implements ControlValueAccessor {
  ngControl = inject(NgControl, { self: true, optional: true });

  @Input() label = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() placeholder = '';
  // --- NEU: Optionales Input für spezifische Fehlermeldungen ---
  @Input() errorMessages: { [key: string]: string } = {};

  @Input() value: string | number = ''; // Kann auch number sein
  @Input() disabled = false;

  // --- NgControl injizieren ---
  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // --- ControlValueAccessor Methoden ---
  // leere Callback-Funktionen, die später von Angular Forms aufgerufen werden
  public onChange = (value: any) => {};
  public onTouched = () => {};
  public writeValue(value: any): void {
    this.value = value;
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // --- Hilfsmethoden für das Template ---
  public get isInvalid(): boolean {
    const control = this.ngControl?.control;
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  public get errors(): ValidationErrors | null {
    return this.ngControl?.control?.errors || null;
  }

  // Gibt die erste gefundene Fehlermeldung zurück
  public get firstErrorMessage(): string | null {
    if (!this.isInvalid || !this.errors) {
      return null;
    }

    const errorKeys = Object.keys(this.errors);
    if (errorKeys.length === 0) {
      return null;
    }

    const firstErrorKey = errorKeys[0];

    // Priorisiere benutzerdefinierte Nachrichten vom Input
    if (this.errorMessages[firstErrorKey]) {
      return this.errorMessages[firstErrorKey];
    }

    // Fallback auf Standardnachrichten
    switch (firstErrorKey) {
      case 'required':
        return 'Dieses Feld ist erforderlich.';
      case 'email':
        return 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
      case 'minlength':
        return `Mindestens ${this.errors['minlength']?.requiredLength} Zeichen erforderlich.`;
      case 'maxlength':
        return `Maximal ${this.errors['maxlength']?.requiredLength} Zeichen erlaubt.`;
      // Füge hier weitere Standardfehler hinzu bei Bedarf
      default:
        return 'Ungültige Eingabe.'; // Generische Meldung
    }
  }

  // --- Event Handler für das Input-Element ---
  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value); // Wertänderung an das Forms-Modul melden
  }

  onBlur() {
    this.onTouched(); // Berührungsstatus an das Forms-Modul melden
  }
}
