import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
// import { AccountAuthService } from '../../services/auth/account-auth-service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  registerForm: FormGroup;
  private router = inject(Router);

  constructor(private fb: FormBuilder, /* private authService: AccountAuthService */) {
    this.registerForm = this.fb.group({
      forname: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
  //   if (this.registerForm.valid) {
  //     this.authService.register(this.registerForm.value).subscribe({
  //       next: (response) => {
  //         console.log(response.message);
  //         this.router.navigate(['']);
  //       },
  //       error: (error) => {
  //         console.error('Registration failed:', error);
  //       },
  //     });
  //   }
  }
}
