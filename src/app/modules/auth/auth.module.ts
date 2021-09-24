import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { httpInterceptor } from 'src/app/core/interceptor/http.interceptor';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmailMobileVerificationComponent } from './registration/components/email-mobile-verification/email-mobile-verification.component';

// UI components
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ButtonModule } from 'primeng-lts/button';
import { ToastModule } from 'primeng-lts/toast';
import { MultiSelectModule } from 'primeng-lts/multiselect';
import { AppComponent } from 'src/app/app.component';

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
    HttpClientModule,
    MultiSelectModule,
  ],

  providers: [
    AppComponent,
    { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true },
  ],
})
export class AuthModule {}
