import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@tanzbereich/button';
import { RouterLink } from '@angular/router';
// import { InputControlComponent } from '@tanzbereich/input-control';
@Component({
  selector: 'tz-user-access',
  templateUrl: './user-access.component.html',
  styleUrl: './user-access.component.css',
  imports: [CommonModule, ButtonComponent, RouterLink],
})
export class UserAccessComponent {}
