import { Component } from '@angular/core';
import { MessageService } from 'primeng-lts/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private messageService: MessageService) {}

  addSingle() {
    this.messageService.add({
      life: 1000,
      severity: 'success',
      summary: 'Service Message',
      detail: 'Via MessageService',
    });
  }
}
