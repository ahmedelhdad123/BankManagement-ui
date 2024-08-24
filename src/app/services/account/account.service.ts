import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'http://localhost:8085/api/accounts';

  constructor(private http: HttpClient,private authService: AuthService) {}

  getAccountDetails(): Observable<any> {
  const token = this.authService.getToken();
  if (!token) {
    console.error('No token found!');
    return throwError(() => new Error('No token found!'));
  }
  console.log("Token from accountService: " + token);
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get(`${this.apiUrl}/myAccount`, { headers });
}

addNewCardNumber(): Observable<any> {
  const token = this.authService.getToken();
  console.log(token)
  if (!token) {
      console.error('No token found!');
      return throwError(() => new Error('No token found!'));
  }
  const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
  });
  console.log(headers);
  return this.http.get(`${this.apiUrl}/addCard`, { headers });
}

deleteAccount(cardNumber: string): Observable<any> {
  const token = this.authService.getToken();
  if (!token) {
    console.error('No token found!');
    return throwError(() => new Error('No token found!'));
  }
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.delete(`${this.apiUrl}/${cardNumber}`, { headers });
}

}
