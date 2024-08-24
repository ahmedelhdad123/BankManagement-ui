import { Component } from '@angular/core';
import { HomeComponent } from '../components/home/home.component';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.css'
})
export class DeleteAccountComponent {

  constructor(private homeComponent: HomeComponent) {}

  deletedAccount(){
    const cardNumber = (document.getElementById('deleteAccountCardNumber') as HTMLInputElement).value;
    this.homeComponent.deleteAccount(cardNumber);
  }
  
}
