import { Component, OnInit } from '@angular/core';
import {RegistrationService} from "../registration.service";
import {Router} from "@angular/router";
import {ApplicationUser} from "../application-user";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  applicationUser = new ApplicationUser();
  message = '';

  constructor(private registrationService: RegistrationService, private router: Router) { }

  ngOnInit(): void {
  }

  registerNewUser() : void {
    this.registrationService.registerApplicationUser(this.applicationUser).subscribe(
      data => {
        this.router.navigate(['/'])
      },
      error => {
        this.message = "User already exists";
      }
    )
  }

}
