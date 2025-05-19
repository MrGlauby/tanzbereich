import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputControlComponent } from '@tanzbereich/input-control';
import { ButtonComponent } from '@tanzbereich/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'tz-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [CommonModule, InputControlComponent, ButtonComponent, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup; // Eine Variable für dein Formular-Modell
  constructor(private fb: FormBuilder) {}


  ngOnInit(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  public onSubmit(): void{
    if(this.loginForm.valid){
      // Formular ist gültig, hier kannst du die Daten verarbeiten
      console.log('Formular ist gültig:', this.loginForm.value);
      // Später: Hier rufst du deinen Authentifizierungs-Service auf
    } else {
      console.log('Formular ist ungültig:', this.loginForm.errors);
      // Optional: Markiere alle Felder als 'touched', um Fehlermeldungen anzuzeigen
      this.loginForm.markAllAsTouched();
    }
  }

}




// <!-- OLD! -->
// <!-- Binde die FormGroup an das div (oder ein <form>-Element) -->

// <div class="main-wrapper" formGroup="loginForm">
//   <tz-input-control
//     [placeholder]="'Mail...'"
//     [type]="'email'"
//     formControlName="email"
//   ></tz-input-control>

//   <!-- [formControlName]="'email'"  -> Verbindet dieses Input-Control mit dem 'email'-FormControl -->

//   <!-- Optional: Fehleranzeige für E-Mail -->

//   <div
//     *ngIf="
//       loginForm.get('email')?.invalid &&
//       (loginForm.get('email')?.touched || loginForm.get('email')?.dirty)
//     "
//   >
//     <small
//       *ngIf="loginForm.get('email')?.errors?.['required']"
//       style="color: rgba(255, 255, 255, 0.341)"
//       >E-Mail ist erforderlich.</small
//     >
//     <small
//       *ngIf="loginForm.get('email')?.errors?.['email']"
//       style="color: rgba(255, 255, 255, 0.341)"
//       >Bitte eine gültige E-Mail eingeben.</small
//     >
//   </div>

//   <tz-input-control
//     [placeholder]="'Password...'"
//     [type]="'password'"
//     formControlName="password"
//   ></tz-input-control>

//   <!-- Optional: Fehleranzeige für Passwort -->
//   <div
//     *ngIf="
//       loginForm.get('password')?.invalid &&
//       (loginForm.get('password')?.touched || loginForm.get('password')?.dirty)
//     "
//   >
//     <small
//       *ngIf="loginForm.get('password')?.errors?.['required']"
//       style="color: rgba(255, 255, 255, 0.341)"
//       >Passwort ist erforderlich.</small
//     >
//   </div>

//   <!--
//     - Binde den Klick an die onSubmit-Methode.
//     - Deaktiviere den Button, wenn das Formular ungültig ist.
//     - Stelle sicher, dass dein tz-button einen (click)-Output hat!
//   -->
//   <tz-button
//     [label]="'Login'"
//     [isPrimary]="true"
//     (click)="onSubmit()"
//     disabled="loginForm.invalid"
//   ></tz-button>
// </div>



