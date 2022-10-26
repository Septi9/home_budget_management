import { Component, OnInit } from '@angular/core';
import {RegistrationService} from "../registration.service";
import {ApplicationUser} from "../application-user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  applicationUser = new ApplicationUser();
  message = '';

  constructor(private router: Router, private registrationService: RegistrationService) { }

  ngOnInit(): void {}

  loginExistingUser() : void {
    this.registrationService.loginApplicationUser(this.applicationUser).subscribe(
      data => this.router.navigate(['/home']),
      error => this.message = "invalid input",
    )
  }


}
