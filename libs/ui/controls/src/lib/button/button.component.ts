import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core'; // HostBinding importieren
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tz-button',
  standalone: true, // Annahme: ist standalone
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() isPrimary: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() label: string = '';
  @Input() name: string = '';

  @Output() click = new EventEmitter<MouseEvent>();

  @HostBinding('class.primary') get primaryClass() {
    return this.isPrimary;
  }

  @HostBinding('class.disabled') get disabledClass() {
    return this.isDisabled;
  }

  // Optional: Fügt das aria-disabled Attribut für bessere Accessibility hinzu
  // Ein Screenreader würde dies als "Deaktivierter Button" vorlesen.
  @HostBinding('attr.aria-disabled') get ariaDisabled() {
    return this.isDisabled ? 'true' : null;
  }

  // --- Event Handler ---
  onClick(event: MouseEvent) {
    if (!this.isDisabled) {
      this.click.emit(event);
    }
  }
}
