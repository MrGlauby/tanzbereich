import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputControlComponent } from '@tanzbereich/input-control';
import { ButtonComponent } from '@tanzbereich/button';

@Component({
  selector: 'tz-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  imports: [CommonModule, InputControlComponent, ButtonComponent],
})
export class RegistrationComponent {}
