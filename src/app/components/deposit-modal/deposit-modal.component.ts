import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-deposit-modal',
  templateUrl: './deposit-modal.component.html',
  styleUrls: ['./deposit-modal.component.css'],
  standalone: true
})
export class DepositModalComponent {
  constructor(private homeComponent: HomeComponent) {}

  deposit() {
    const amount = parseFloat((document.getElementById('depositAmount') as HTMLInputElement).value);
    const cardNumber = (document.getElementById('depositCardNumber') as HTMLInputElement).value;
    this.homeComponent.deposit(amount, cardNumber);
  }
}
