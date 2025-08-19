import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService, toastService } from '@document-library-search-system/Common';

@Component({
  selector: 'lib-register',
  imports: [CommonModule, MatCard, MatFormField, MatLabel, MatInput, ReactiveFormsModule, MatButton, MatIcon, RouterModule],
  templateUrl: './Register.html',
  styleUrl: './Register.css',
})
export class Register {
    fb = inject(FormBuilder);
  authService = inject(AuthService);
  toastService = inject(toastService);
  router = inject(Router);

  confirmPasswordValidator = (controls: AbstractControl) => {
    return controls.get('password')?.value === controls.get('confirmPassword')?.value ? null : { passwordMisMatch: true };
  }


  registrartinForm = this.fb.group({
    email: ['', { validators: [Validators.required, Validators.email]}],
    fullname: ['', { validators: [Validators.required]}],
    password: ['', { validators: [Validators.required, Validators.minLength(6)] }],
    confirmPassword: ['', { validatores: [Validators.required] }]
  }, { validators: this.confirmPasswordValidator })


  getFormControl = (type: 'email' | 'fullname' | 'password' | 'confirmPassword'): FormControl => {
    return this.registrartinForm.controls[type];
  }

  submitRegister() {
    if (!this.registrartinForm.valid) return;

    this.authService.register({
      email: this.registrartinForm.value.email || '',
      fullname: this.registrartinForm.value.fullname || '',
      password: this.registrartinForm.value.password || ''
    }).subscribe(res => {
      this.router.navigate(['login']);
      this.toastService.show("Registration successful!")
    }, err => {
      this.toastService.show(err.error.message || err.message)
    })

  }
}
