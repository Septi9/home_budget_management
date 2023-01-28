import { Component, OnInit } from '@angular/core';
import {RegistrationService} from "../registration.service";
import {ApplicationUser} from "../application-user";
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  applicationUser = new ApplicationUser();
  message = '';

  constructor(private router: Router, private registrationService: RegistrationService, private authService : AuthenticationService) { }

  ngOnInit(): void {}

  loginExistingUser() : void {
    this.registrationService.loginApplicationUser(this.applicationUser).subscribe(
      data => {
        this.authService.authenticate(this.applicationUser.email);
        this.router.navigate(['/home']);
      },
      error => this.message = "Niepoprawny email lub hasło",
    )
  }


}
