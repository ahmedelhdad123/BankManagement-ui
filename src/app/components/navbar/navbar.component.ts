import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { AuthService } from "../../services/auth/auth.service";
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    SigninComponent,
    SignupComponent,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
    isLogin : boolean = false;
    constructor(private authService: AuthService){}

    ngOnInit() : void {
      this.authService.user.subscribe({
        next:() =>{
          if( this.authService.getToken() != null){
            this.isLogin=true;
          }else{
            this.isLogin=false;
          }
        }
      })
    }
  

  logOut(){
    this.authService.logout();
  }
}
