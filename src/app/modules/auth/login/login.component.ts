import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  sendOTPStatus: boolean = false;

  resendOTPCount: number = 60;
  clearResendOTP: any;

  email: string = '';
  password: string = '';
  mobileNumber: string = '';
  mobileOTP: string = '';

  tenancyMetaDetails: any;

  OTPNotVerifyStatus: boolean = false;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  stopTimer() {
    clearInterval(this.clearResendOTP);
    console.log('myTimer', this.clearResendOTP);
  }

  resendOTPFuction() {
    var request = {
      login_type: 2,
      mobile_number: this.mobileNumber,
    };
    this.signInAPI(request, 'mobileLogin');
  }

  signIn() {
    var request = {
      login_type: 1,
      email: this.email,
      password: this.password,
    };

    this.signInAPI(request, 'emailLogin');
  }

  otpVerifyFun() {
    let request = {
      taid: this.tenancyMetaDetails.data.taid,
      otp_verify_type: 1,
      otp_type: 2,
      otp_temp_key: this.tenancyMetaDetails.data.mobile_otp_temp_key,
      otp: this.mobileOTP,
    };

    this.authService.tenancyOTPVerifyAPI(request).subscribe((res) => {
      console.log('tenancyOTPVerifyAPI', res);
      this.redirectionFun(res);
    });
  }

  signInAPI(request: object, loginType: string) {
    this.authService.emailSignIn(request).subscribe(
      (res) => {
        console.log('emailSignIn', res);

        if (loginType == 'mobileLogin') {
          this.sendOTPStatus = true;
          this.tenancyMetaDetails = res;
          alert(`Mobile OTP : ${res.data.mobile_otp}`);
          this.resendOTPCount = 60;
          this.clearResendOTP = setInterval(() => {
            if (this.resendOTPCount == 0) {
              this.stopTimer();
            } else {
              this.resendOTPCount--;
            }
          }, 1000);
        } else if (loginType == 'emailLogin') {
          this.redirectionFun(res);
        }
      },
      (error) => {
        console.log('login error', error);
        if (error.error.message == 'Email and mobile number not verified!') {
          this.OTPNotVerifyStatus = true;
          this.tenancyMetaDetails = error.error;
        }
      }
    );
  }

  redirectionFun(cookiesData: any) {
    this.cookieService.set(
      '_token',
      JSON.stringify(cookiesData),
      20,
      '',
      environment.cookies_domain,
      true
    );
    window.open(environment.front_end_url, '_self');
  }
}
