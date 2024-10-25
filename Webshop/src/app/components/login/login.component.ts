import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputPasswordComponent } from "../shared/input/input-password/input-password.component";
import { AccountAuthService } from '../../services/auth/account-auth-service';
import { InputEmailComponent } from '../shared/input/email/input-email.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    InputEmailComponent, 
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
