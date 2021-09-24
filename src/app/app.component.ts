import { Component } from '@angular/core';
import { MessageService } from 'primeng-lts/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private messageService: MessageService) {}

  toastMessage(header: string, toastType: string, message: string) {
    this.messageService.add({
      life: 2000,
      severity: toastType,
      summary: header,
      detail: message,
    });
  }
}
