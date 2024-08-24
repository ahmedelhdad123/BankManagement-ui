import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:8085/api/transactions';

  constructor(private http: HttpClient) { }

  deposit(amount: number, cardNumber: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const depositRequest = { amount, cardNumber };

    return this.http.post(`${this.apiUrl}/deposit`, depositRequest, { headers }).pipe(
      catchError((error) => {
        console.error('Error depositing:', error);
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
  }

  withdraw(amount: number, cardNumber: string, cvv: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const withdrawRequest = { amount, cardNumber, cvv };

    return this.http.post(`${this.apiUrl}/withdraw`, withdrawRequest, { headers }).pipe(
      catchError((error) => {
        console.error('Error withdrawing:', error);
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
  }
}
