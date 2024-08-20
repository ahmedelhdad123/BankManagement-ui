import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";
import { ProfileComponent } from "./profile/profile.component";
import { authGuard } from "./guard/auth.guard";

export const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [authGuard]  // Protecting the profile route
  },
  {
    path: "**",
    redirectTo: 'signin',
    pathMatch: 'full'
  }
];
