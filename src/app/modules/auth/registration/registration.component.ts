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
import { endPoints } from 'src/assets/end-points/end-points';
import { AppComponent } from 'src/app/app.component';

import { MustMatch } from '../../auth/confirm-password-validator/confirmPassword';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  signBasicDetailsStatus: boolean = false;
  signInForm!: FormGroup;
  submitted: boolean = false;

  solutionListData: any = [
    {
      solution_id: 1,
      solution_key: 'rIbXOMaLTg3rTLv3',
      solution_name: 'Food Delivery',
    },
  ];

  constructor(
    private endPoints: endPoints,
    private toastMessage: AppComponent,
    private formBuilder: FormBuilder
  ) {
    // console.log('endPoints', this.endPoints.serverEndPoint.login);
    // this.toastMessage.addSingle();
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
    return this.signInForm?.controls;
  }

  signInSumbit() {
    console.log('form', this.signInForm);
    this.submitted = true;
    // this.toastMessage.addSingle();

    if (this.signInForm?.valid) {
      this.signBasicDetailsStatus = true;
    }
  }
}
