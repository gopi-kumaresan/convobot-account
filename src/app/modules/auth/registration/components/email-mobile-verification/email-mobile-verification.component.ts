import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-email-mobile-verification',
  templateUrl: './email-mobile-verification.component.html',
  styleUrls: ['./email-mobile-verification.component.scss'],
})
export class EmailMobileVerificationComponent implements OnInit {
  @Input() item: any;
  constructor() {}

  ngOnInit(): void {
    console.log('item', this.item);
  }
}
