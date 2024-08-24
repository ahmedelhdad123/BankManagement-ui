import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-withdraw-modal',
  templateUrl: './withdraw-modal.component.html',
  styleUrls: ['./withdraw-modal.component.css'],
  standalone: true
})
export class WithdrawModalComponent {
  constructor(private homeComponent: HomeComponent) {}

  withdraw() {
    const amount = parseFloat((document.getElementById('withdrawAmount') as HTMLInputElement).value);
    const cardNumber = (document.getElementById('withdrawCardNumber') as HTMLInputElement).value;
    const cvv = (document.getElementById('withdrawCvv') as HTMLInputElement).value;
    this.homeComponent.withdraw(amount, cardNumber, cvv);
  }
}
