import { Component, Input, Optional, Self } from '@angular/core';
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
  @Input() label = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() placeholder = '';
  // --- NEU: Optionales Input für spezifische Fehlermeldungen ---
  @Input() errorMessages: { [key: string]: string } = {};

  value: string | number = ''; // Kann auch number sein
  disabled = false;

  // --- NgControl injizieren ---
  // @Self() stellt sicher, dass wir die Direktive vom Host-Element bekommen
  // @Optional() verhindert Fehler, falls die Komponente mal nicht in einem Formular verwendet wird
  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      // Dies weist Angular an, diese Komponente als ValueAccessor für das ngControl zu verwenden.
      this.ngControl.valueAccessor = this;
    }
  }

  // --- ControlValueAccessor Methoden ---
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
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

  // --- Hilfsmethoden für das Template ---
  get isInvalid(): boolean {
    // Prüft, ob das verbundene Control ungültig UND berührt/geändert ist
    const control = this.ngControl?.control;
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  get errors(): ValidationErrors | null {
    return this.ngControl?.control?.errors || null;
  }

  // Gibt die erste gefundene Fehlermeldung zurück
  get firstErrorMessage(): string | null {
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
