import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// UI components
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ButtonModule } from 'primeng-lts/button';
import { endPoints } from 'src/assets/end-points/end-points';
import { ToastModule } from 'primeng-lts/toast';
import { AppComponent } from 'src/app/app.component';
import { EmailMobileVerificationComponent } from './registration/components/email-mobile-verification/email-mobile-verification.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    RegistrationComponent,
    EmailMobileVerificationComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatTabsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [endPoints, AppComponent],
})
export class AuthModule {}
