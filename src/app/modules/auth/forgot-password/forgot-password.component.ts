import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../../auth/confirm-password-validator/confirmPassword';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  sendOTPStatus: boolean = false;
  email: string = '';
  tenancyMetaDetails: any;
  emailOTP: string = '';

  forgotPasswordStageStatus: string = 'emailVerification';
  passwordSubmitted: boolean = false;
  newPasswordForm!: FormGroup;

  OTPNotVerifyStatus: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newPasswordForm = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
          ],
        ],
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

  forgotPasswordFun(step: string) {
    if (step == 'otpVerification') {
      this.authService.otpSendEmailId({ email: this.email }).subscribe(
        (res) => {
          console.log('otpSendEmailId', res);
          this.forgotPasswordStageStatus = step;
          alert(`Mobile OTP : ${res.data.email_otp}`);
          this.tenancyMetaDetails = res;
        },
        (error) => {
          console.log('login error', error);
          if (error.error.message == 'Email and mobile number not verified!') {
            this.OTPNotVerifyStatus = true;
            this.tenancyMetaDetails = error.error;
          }
        }
      );
    } else if (step == 'setNewPassword') {
      let request = {
        taid: this.tenancyMetaDetails.data.taid,
        otp_verify_type: 2,
        otp_type: 1,
        otp_temp_key: this.tenancyMetaDetails.data.email_otp_temp_key,
        otp: this.emailOTP,
      };

      this.authService.tenancyOTPVerifyAPI(request).subscribe((res) => {
        console.log('tenancyOTPVerifyAPI', res);
        this.forgotPasswordStageStatus = step;
      });
    } else if (step == 'resetPassword') {
      console.log('newPasswordForm', this.newPasswordForm.value);
      this.passwordSubmitted = true;
      if (this.newPasswordForm.valid) {
        var request = {
          email: this.email,
          password: this.newPasswordForm.controls.password.value,
        };
        this.authService.resetPasswordAPI(request).subscribe((res: any) => {
          console.log('resetPasswordAPI', res);
          if (res.success) {
            this.router.navigateByUrl('/login');
          }
        });
      }
    }
  }
}
