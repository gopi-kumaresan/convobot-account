import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMobileVerificationComponent } from './email-mobile-verification.component';

describe('EmailMobileVerificationComponent', () => {
  let component: EmailMobileVerificationComponent;
  let fixture: ComponentFixture<EmailMobileVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailMobileVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailMobileVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
