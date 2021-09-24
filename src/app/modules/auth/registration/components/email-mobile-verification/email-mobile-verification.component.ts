import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/modules/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-email-mobile-verification',
  templateUrl: './email-mobile-verification.component.html',
  styleUrls: ['./email-mobile-verification.component.scss'],
})
export class EmailMobileVerificationComponent implements OnInit {
  @Input() tenancyMetaDetails: any;
  mobileOTP: any;
  emailOTP: any;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    console.log('tenancyMetaDetails', this.tenancyMetaDetails);
    this.tenancyMetaDetails.otp_status = {
      email_verified: 0,
      mobile_no_verified: 0,
    };

    alert(
      `Mobile OTP : ${this.tenancyMetaDetails.data.mobile_otp}, Email OTP : ${this.tenancyMetaDetails.data.email_otp}`
    );
  }

  otpVerifyFun(event: any, otpType: string) {
    console.log('event', event);
    console.log('otpType', otpType);

    if (otpType == '2' && this.mobileOTP.length == 4) {
      let request = {
        taid: this.tenancyMetaDetails.data.taid,
        otp_verify_type: 1,
        otp_type: otpType,
        otp_temp_key: this.tenancyMetaDetails.data.mobile_otp_temp_key,
        otp: this.mobileOTP,
      };
      console.log('mobileOTP', this.mobileOTP.length);
      this.otpVerifyAPI(request);
    } else if (otpType == '1' && this.emailOTP.length == 4) {
      console.log('emailOTP', this.emailOTP);
      let request = {
        taid: this.tenancyMetaDetails.data.taid,
        otp_verify_type: 1,
        otp_type: otpType,
        otp_temp_key: this.tenancyMetaDetails.data.email_otp_temp_key,
        otp: this.emailOTP,
      };
      this.otpVerifyAPI(request);
    }
  }

  otpVerifyAPI(request: object) {
    this.authService.tenancyOTPVerifyAPI(request).subscribe((res) => {
      console.log('tenancyOTPVerifyAPI', res);
      this.tenancyMetaDetails.otp_status = res.data;
      console.log('tenancyMetaDetails', this.tenancyMetaDetails);

      if (res.data.email_verified == 1 && res.data.mobile_no_verified == 1) {
        this.verifyBoth(res);
      }
    });
  }

  verifyBoth(cookiesData: any) {
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
