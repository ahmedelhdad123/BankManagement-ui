import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8085/api/auth';

  user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
  constructor(private http: HttpClient,private router:Router) {}

  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user)
  }

  login(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/login`, user)
  }

  saveUser(){
    let encodedToken= JSON.stringify(localStorage.getItem('userToken'));
    this.user.next(encodedToken);
    console.log(this.user);
  }

  logout() {
    localStorage.removeItem('userToken');
    this.user.next(null);
    this.router.navigate(['/login'])
  }

  getToken(): string | null {
    return localStorage.getItem('userToken');
  }
  
}
