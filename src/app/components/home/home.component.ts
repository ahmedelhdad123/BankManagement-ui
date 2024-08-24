import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account/account.service';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { DepositModalComponent } from '../deposit-modal/deposit-modal.component';
import { WithdrawModalComponent } from '../withdraw-modal/withdraw-modal.component';
import { TransactionService } from '../../services/transaction/transaction.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    DepositModalComponent,   // Import here
    WithdrawModalComponent   // Import here
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  accounts: any[] = [];

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private transactionService: TransactionService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getAccountDetails();
  }

  getAccountDetails() {
    this.accountService.getAccountDetails().subscribe(
      (response) => {
        this.accounts = response.data;
        console.log('Account Details from home:', this.accounts);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  addNewCardNumber() { 
    this.accountService.addNewCardNumber().subscribe(
      (response) => {
        console.log('New card added:', response);
        this.getAccountDetails(); // Fetch updated account details after adding a card
      },
      (error) => {
        console.error('Error adding new card:', error);
      }
    );
  }

  deposit(amount: number, cardNumber: string) {
    this.transactionService.deposit(amount, cardNumber).subscribe(
      (response) => {
        console.log('Deposit successful:', response);
        this.getAccountDetails();  // Refresh account details after deposit
      },
      (error) => {
        console.error('Error depositing:', error);
      }
    );
  }
  
  withdraw(amount: number, cardNumber: string, cvv: string) {
    this.transactionService.withdraw(amount, cardNumber, cvv).subscribe(
      (response) => {
        console.log('Withdraw successful:', response);
        this.getAccountDetails();  // Refresh account details after withdrawal
      },
      (error) => {
        console.error('Error withdrawing:', error);
      }
    );
  }  
}
