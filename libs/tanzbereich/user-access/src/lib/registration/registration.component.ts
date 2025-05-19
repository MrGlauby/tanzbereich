import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputControlComponent } from '@tanzbereich/input-control';
import { ButtonComponent } from '@tanzbereich/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'tz-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  imports: [CommonModule, InputControlComponent, ButtonComponent],
})
export class RegistrationComponent implements OnInit {



  registrationForm! : FormGroup; // Eine Variable für dein Formular-Modell

  constructor(private fb: FormBuilder) {}

  ngOnInit(){
    this.registrationForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  public onSubmit(): void{
    if(this.registrationForm.valid){
      // Formular ist gültig, hier kannst du die Daten verarbeiten
      console.log('Formular ist gültig:', this.registrationForm.value);
      // Später: Hier rufst du deinen Authentifizierungs-Service auf
    } else {
      console.log('Formular ist ungültig:', this.registrationForm.errors);
      // Optional: Markiere alle Felder als 'touched', um Fehlermeldungen anzuzeigen
      this.registrationForm.markAllAsTouched();
    }
  }

}
