import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    HttpClientModule,
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  error: string = '';
  is_loading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])  // Added minlength validator
  });

  constructor(
    private _Router: Router,
    private authService: AuthService
  ) {}

  submitLogin() {
    if (this.loginForm.valid) {
      this.is_loading = true;
      this.error = '';  // Reset error message before login attempt

      this.authService.login(this.loginForm.value).subscribe({
        next: (result) => {
          this.is_loading = false;

          if (result && result.data?.token) {
            localStorage.setItem('userToken', result.data.token);
            this.authService.saveUser();
            this._Router.navigate(['/home']);
          } else {
            this.error = result.message || 'Login failed. Please try again.';
          }
        },
        error: (err) => {
          this.is_loading = false;
          this.error = 'Email Or Password is Wrong';
        }
      });
    } else {
      this.error = 'Please fill in the form correctly.';
    }
  }
}
