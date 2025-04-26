import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputControlComponent } from '@tanzbereich/input-control';
import { ButtonComponent } from '@tanzbereich/button';

@Component({
  selector: 'tz-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [CommonModule, InputControlComponent, ButtonComponent],
})
export class LoginComponent {}
