import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountAuthService } from '../../services/account-auth.service';
import { SignInButtonComponent } from './sign-in-button/sign-in-button.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,
    SignInButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  private router = inject(Router);

  constructor(private fb: FormBuilder, private authService: AccountAuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response.message);
          this.router.navigate(['']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
        },
      });
    }
  }
}
