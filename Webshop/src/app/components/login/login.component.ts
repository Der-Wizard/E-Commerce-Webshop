import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextComponent } from '../shared/input/text/input-text.component';
import { InputPasswordComponent } from "../shared/input/input-password/input-password.component";
import { AccountAuthService } from '../../services/auth/account-auth-service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    InputTextComponent, 
    InputPasswordComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AccountAuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.authService.isLoggedIn$.subscribe((value) => {
      if (value)
        return;
      this.loginForm.reset();
      this.loginForm.markAllAsTouched();
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.login(this.loginForm.value);
  }
}
