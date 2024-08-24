import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account/account.service';
import { AuthService } from '../../services/auth/auth.service';
import { TransactionService } from '../../services/transaction/transaction.service';
import { DepositModalComponent } from '../deposit-modal/deposit-modal.component';
import { WithdrawModalComponent } from '../withdraw-modal/withdraw-modal.component';
import { DeleteAccountComponent } from "../../delete-account/delete-account.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DepositModalComponent,
    WithdrawModalComponent,
    DeleteAccountComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  accounts: any[] = [];
  operationStatus: boolean | null = null;  
  operationMessage: string = '';       

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private transactionService: TransactionService
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
        // console.log('New card added:', response);
        this.operationStatus = true;
        this.operationMessage = 'Account Added successful!';
        this.getAccountDetails();
        this.clearOperationMessage(); 

      },
      (error) => {
        this.operationStatus = false;
        this.operationMessage = 'Error during Added Account. Please try again.';
        this.clearOperationMessage();
      }
    );
  }

  deposit(amount: number, cardNumber: string) {
    this.transactionService.deposit(amount, cardNumber).subscribe(
      (response) => {
        this.operationStatus = true;
        this.operationMessage = 'Deposit successful!';
        this.getAccountDetails();
        this.clearOperationMessage(); 
      },
      (error) => {
        this.operationStatus = false;
        this.operationMessage = 'Error during deposit. Please try again.';
        this.clearOperationMessage();
      }
    );
  }

  withdraw(amount: number, cardNumber: string, cvv: string) {
    this.transactionService.withdraw(amount, cardNumber, cvv).subscribe(
      (response) => {
        this.operationStatus = true;
        this.operationMessage = 'Withdraw successful!';
        this.getAccountDetails();
        this.clearOperationMessage();
      },
      (error) => {
        this.operationStatus = false;
        this.operationMessage = 'Error during withdrawal. Please try again.';
        this.clearOperationMessage();
      }
    );
  }

  deleteAccount(cardNumber: string){
    this.accountService.deleteAccount(cardNumber).subscribe(
      (response) => {
        this.operationStatus = true;
        this.operationMessage = 'Deleted Account successful!';
        this.getAccountDetails();
        this.clearOperationMessage();
      },
      (error) => {
        this.operationStatus = false;
        this.operationMessage = 'Error during deletion. Please try again.';
        this.clearOperationMessage();
      }
    )
  }

  clearOperationMessage() {
    setTimeout(() => {
      this.operationStatus = null;
      this.operationMessage = '';
    }, 4000);  
  }
}
