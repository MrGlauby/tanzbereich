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
