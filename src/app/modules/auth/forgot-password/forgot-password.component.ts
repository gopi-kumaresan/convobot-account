import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MustMatch } from '../../auth/confirm-password-validator/confirmPassword';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  sendOTPStatus: boolean = false;

  forgotPasswordStageStatus: string = 'emailVerification';
  passwordSubmitted: boolean = false;
  newPasswordForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.newPasswordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.newPasswordForm?.controls;
  }

  setNewPasswordFunction() {
    this.passwordSubmitted = true;
  }
}
