import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:8085/api/users';

  constructor(private http: HttpClient,private authService: AuthService) {}

  getUserDetails (): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No token found!');
      return throwError(() => new Error('No token found!'));
    }
    console.log("Token from accountService: " + token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}`, { headers });
  }
}
