import { Component } from '@angular/core';
import { ProfileService } from '../services/profile/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user : any = [];

  constructor(
    private profileServuce: ProfileService) {}

  ngOnInit(): void {
    this.getUserDetails()
  }

  getUserDetails(){
    this.profileServuce.getUserDetails().subscribe(
      (response) => {
        this.user= response.data;
        console.log('User Details form home:', this.user);
      },
      (error) => {

        console.error('Error:', error);
      }
    );
  }
}
