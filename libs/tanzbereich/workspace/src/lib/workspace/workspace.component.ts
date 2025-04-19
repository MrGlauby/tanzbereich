import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@tanzbereich/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-workspace',
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css',
  imports: [CommonModule, RouterLink, ButtonComponent],
})
export class WorkspaceComponent {}
