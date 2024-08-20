import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account/account.service';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  accounts: any[] = [];

  constructor(
    private accountService: AccountService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAccountDetails();
  }

  getAccountDetails(){
    this.accountService.getAccountDetails().subscribe(
      (response) => {
        this.accounts= response.data;
        console.log('Account Details form home:', this.accounts);
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
  
}
