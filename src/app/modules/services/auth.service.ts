import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EndPoints } from '../../core/end-points/EndPoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getSolutionsList(): Observable<any> {
    return this.http.get(
      `${environment.laraval_base_url}${EndPoints.solution_list_out_api}`
    );
  }

  tenancyRegistrationAPI(request: object): Observable<any> {
    return this.http.post(
      `${environment.laraval_base_url}${EndPoints.tenancy_registration_create}`,
      request
    );
  }

  tenancyOTPVerifyAPI(request: object): Observable<any> {
    return this.http.post(
      `${environment.laraval_base_url}${EndPoints.otp_verify_api}`,
      request
    );
  }

  emailSignIn(request: object): Observable<any> {
    return this.http.post(
      `${environment.laraval_base_url}${EndPoints.login_api}`,
      request
    );
  }

  otpSendEmailId(request: object): Observable<any> {
    return this.http.post(
      `${environment.laraval_base_url}${EndPoints.forgotpassword_otp_email}`,
      request
    );
  }

  resetPasswordAPI(request: object) {
    return this.http.post(
      `${environment.laraval_base_url}${EndPoints.reset_password_api}`,
      request
    );
  }
}
