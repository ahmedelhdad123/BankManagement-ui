import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { AuthService } from "../../services/auth/auth.service";
import { ProfileService } from '../../services/profile/profile.service';
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
    isLogin: boolean = false;
    userName: string = '';

    constructor(
      private authService: AuthService,
      private profileService: ProfileService,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    ngOnInit(): void {
      this.authService.user.subscribe({
        next: () => {
          this.isLogin = this.authService.getToken() != null;
          if (this.isLogin) {
            this.fetchUserDetails();
          } else {
            this.userName = '';
          }
        }
      });
    }

    fetchUserDetails(): void {
      this.profileService.getUserDetails().subscribe(
        (response) => {
          this.userName = response.data.name;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }

    ngAfterViewInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        this.initializeBootstrapComponents();
      }
    }

    initializeBootstrapComponents(): void {
      import('bootstrap').then((bootstrap) => {
        const modalElement = document.getElementById('welcomeModal');
        if (modalElement) {
          const bootstrapModal = new bootstrap.Modal(modalElement);
        }
      });
    }

    showWelcomeModal(event: Event): void {
      event.preventDefault(); 
      if (isPlatformBrowser(this.platformId)) {
        const modalElement = document.getElementById('welcomeModal') as HTMLElement;
        if (modalElement) {
          import('bootstrap').then((bootstrap) => {
            const welcomeModal = new bootstrap.Modal(modalElement);
            welcomeModal.show(); 
          });
        }
      }
    }

    logOut(): void {
      this.authService.logout();
      this.isLogin = false;
      this.userName = '';
    }
}