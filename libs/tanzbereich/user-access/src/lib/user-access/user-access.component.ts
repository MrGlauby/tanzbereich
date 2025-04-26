import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@tanzbereich/button';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'tz-user-access',
  templateUrl: './user-access.component.html',
  styleUrl: './user-access.component.css',
  imports: [CommonModule, ButtonComponent, RouterLink, LoginComponent, RegistrationComponent],
})
export class UserAccessComponent {}
