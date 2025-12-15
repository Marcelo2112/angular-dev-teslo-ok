import { AuthService } from '@/auth/services/auth.service';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
})
export class RegisterPage {

  private fb = inject(FormBuilder);
  private router = inject(Router)

  authService = inject(AuthService);

  isPosting = signal(false);
  hasError = signal(false);
  hasSuccess = signal(false)


  myRegisterForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    fullName: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.myRegisterForm.invalid) {
      this.myRegisterForm.markAllAsTouched();
      this.hasError.set(true)
      const controls = this.myRegisterForm.controls;

      console.log('FORM ERRORS:');

      console.log('Email errors:', controls['email'].errors);
      console.log('Password errors:', controls['password'].errors);
      console.log('FullName errors:', controls['fullName'].errors);
      return;
    }
    this.isPosting.set(true);

    const { email = '', password = '', fullName = '' } = this.myRegisterForm.value;

    this.authService.register(email, password, fullName).subscribe((ok) => {
      this.isPosting.set(false);

      if (ok) {
        this.hasSuccess.set(true);


        console.log(`Cuentra creada con exito: ${email} ${fullName}`)
        setTimeout(() => {
          this.hasSuccess.set(false);
          this.router.navigateByUrl('/auth/login');
        }, 3000);
        return;
      }

      this.hasError.set(true);
      setTimeout(() => this.hasError.set(false), 2000);
    })


  }

}
