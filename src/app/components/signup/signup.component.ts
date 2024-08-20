import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  is_loading: boolean = false;
  date: Date | undefined;
  error: string = '';

  constructor(private _Router: Router, private authService: AuthService) {}

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(60)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^(012|010|011|015)\d{8}$/)]),
    password: new FormControl('', [Validators.required])
  });

  submitRegisterForm() {
    console.log(this.registerForm.value);
    this.is_loading = true;
    this.authService.signup(this.registerForm.value).subscribe({
      next: (result) => {
        this.is_loading = false;
        console.log(result);
        if (result) {
          this._Router.navigate(['/signin']);
        } else {
          this.error = result.message;
        }
      }
    });
  }
}