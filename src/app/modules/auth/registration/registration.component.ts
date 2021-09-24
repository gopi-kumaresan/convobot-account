import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormBuilder,
} from '@angular/forms';

import { AppComponent } from 'src/app/app.component';

import { MustMatch } from '../../auth/confirm-password-validator/confirmPassword';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  signBasicDetailsStatus: boolean = false;
  signInForm!: FormGroup;
  submitted: boolean = false;

  solutionListData: any = [];
  tenancyMetaDetails: any;

  constructor(
    private toastMessage: AppComponent,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    // console.log('endPoints', this.endPoints.serverEndPoint.login);
    // this.toastMessage.addSingle();
    this.solutionsListOutFun();
  }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group(
      {
        companyName: ['', Validators.required],

        email: ['', [Validators.required, Validators.email]],
        mobileNumber: [
          '',
          [
            Validators.required,
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          ],
        ],
        solution: ['', Validators.required],
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
    return this.signInForm?.controls;
  }

  signInSumbit() {
    console.log('form', this.signInForm.value);
    this.submitted = true;
    // this.toastMessage.addSingle();

    if (this.signInForm?.valid) {
      var solutionID: any = [];
      this.signInForm.value.solution.map((id: any) => {
        solutionID.push(id.solution_id);
      });

      let request = {
        company_name: this.signInForm.value.companyName,
        primary_mail_id: this.signInForm.value.email,
        password: this.signInForm.value.password,
        mobile_number: this.signInForm.value.mobileNumber,
        solution: solutionID,
        // solution: this.signInForm.value.solution[0].solution_id,
      };
      this.authService.tenancyRegistrationAPI(request).subscribe((res) => {
        console.log('tenancyRegistrationAPI', res);
        this.tenancyMetaDetails = res;
        this.signBasicDetailsStatus = true;
      });
    }
  }

  solutionsListOutFun() {
    this.authService.getSolutionsList().subscribe((res) => {
      console.log('getSolutionsList', res);
      this.solutionListData = res.data;
    });
  }
}
